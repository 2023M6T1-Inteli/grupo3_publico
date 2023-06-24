package inteli.cc6;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import java.io.FileReader;
import java.util.Arrays;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import inteli.cc6.Pattern.PatternFinder;
import inteli.cc6.Pattern.Roll;
import inteli.cc6.Simplex.Simplex;

/**

 The Main class contains the main method for running the program, which reads input data from CSV files,
 generates patterns for cutting rolls of material, and solves the resulting linear programming problem using the Simplex algorithm.
 */

public class Main {
    /**
     The main method of the program.
     @param args an array of command-line arguments
     */
    public static void main(String[] args) {
        try {
            // Set up file paths and read in parameters from CSV file
            String filePath = "/home/rafael/Documents/Github/grupo3/codigo/planejador/src/main/java/inteli/cc6/";
            String filePathParams = filePath + "params.csv";
            File paramsFile = new File(filePathParams);

            CSVParser paramsParser = CSVParser.parse(new FileReader(paramsFile), CSVFormat.DEFAULT.withHeader());

            // Extract parameters from header row of CSV file
            CSVRecord headerRow = paramsParser.getRecords().get(0);
            int maxRollWidth = Integer.parseInt(headerRow.get("Larg Max"));
            int minimumWidth = Integer.parseInt(headerRow.get("Larg Min"));
            int maxKnives = 6;

            paramsParser.close();

            // Read in items to be cut from CSV file
            String filePathItems = filePath + "items.csv";
            File itemsFile = new File(filePathItems);
            CSVParser itemsParser = CSVParser.parse(new FileReader(itemsFile), CSVFormat.DEFAULT.withHeader());

            // Extract widths and demands of each item from CSV file
            ArrayList<Integer> widths = new ArrayList<>();
            ArrayList<Integer> demands = new ArrayList<>();

            for (CSVRecord record : itemsParser) {
                for (int i = 3; i < record.values().length; i++) {
                    if (i == 3) widths.add(Integer.parseInt(record.values()[i]));
                    else demands.add(Integer.parseInt(record.values()[i]));
                }
            }
            itemsParser.close();

            // Create Roll objects for each item with its width and demand
            ArrayList<Roll> rolls = new ArrayList<>();
            for (int i = 0; i < widths.size(); i++) {
                rolls.add(new Roll(widths.get(i), demands.get(i)));
            }

            PatternFinder patternFinder = new PatternFinder(rolls, maxRollWidth, maxKnives);

            // Get unique widths and demands (sorted according to the widths) from the PatternFinder object
            ArrayList<Integer> uniqueWidths = patternFinder.getWidths();
            ArrayList<Integer> sortedDemands = patternFinder.getSortedTotalDemands();

            // Transform the ArrayList into array of primitive ints
            int[] uniqueDemands = sortedDemands.stream().mapToInt(i -> i).toArray();

            // Solve the linear programming problem using the Simplex with Column Generation algorithm
            Simplex simplex = new Simplex(false, 0);

            /*
                Create the homogeneous matrix for the linear programming problem.
                The main diagonal is completed by maxRollWidth / width for each width
                (lines represent the widths, columns represent the patterns).
            */
            double[][] matrix = simplex.createHomogeneousMatrix(uniqueWidths, maxRollWidth, maxKnives);
            simplex.simplex(matrix, uniqueDemands, uniqueWidths, maxRollWidth, maxKnives, 9999999, 0, minimumWidth);

            // Print the results of the algorithm (the patterns and number of takes of each pattern)
            System.out.println(simplex.getPatterns());
            System.out.println(Arrays.toString(simplex.getDecisionVariables()));

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
