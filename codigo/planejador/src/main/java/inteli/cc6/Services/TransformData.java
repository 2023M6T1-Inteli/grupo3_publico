package inteli.cc6.Services;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import java.io.FileReader;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import inteli.cc6.Main;
import inteli.cc6.Pattern.Roll;

/**

 The TransformData class represents a data transformation process.

 It reads a CSV file containing width and demand data, and transforms

 it into a collection of Roll objects.
 */
public class TransformData {
    private ArrayList<Integer> widths = new ArrayList<>(); // Stores the widths extracted from the CSV file.
    private ArrayList<Integer> demands = new ArrayList<>(); // Stores the demands extracted from the CSV file.
    private ArrayList<Roll> rolls = new ArrayList<>(); // Stores the Roll objects created from the widths and demands.
    private File file; // Represents the CSV file to be read.

    /**

     Constructs a new TransformData object with the specified file name.

     @param file the name of the CSV file to be read
     */
    public TransformData(String file) {
        
        ClassLoader classLoader = Main.class.getClassLoader();


        this.file = new File(classLoader.getResource(file).getFile());

        try {
            CSVParser itemsParser = CSVParser.parse(new FileReader(this.file), CSVFormat.DEFAULT.withHeader());
            for (CSVRecord record : itemsParser) {
                for (int i = 3; i < record.values().length; i++) {
                    if (i == 3)
                        widths.add(Integer.parseInt(record.values()[i]));
                    else
                        demands.add(Integer.parseInt(record.values()[i]));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        for (int i = 0; i < widths.size(); i++) {
            rolls.add(new Roll(widths.get(i), demands.get(i)));
        }
    }

    /**

     Returns the list of widths extracted from the CSV file.
     @return the list of widths
     */
    public ArrayList<Integer> getWidths() {
        return this.widths;
    }
    /**

     Returns the list of demands extracted from the CSV file.
     @return the list of demands
     */
    public ArrayList<Integer> getDemands() {
        return this.demands;
    }
    /**

     Returns the list of Roll objects created from the widths and demands.
     @return the list of Roll objects
     */
    public ArrayList<Roll> getRolls() {
        return this.rolls;
    }
}