package inteli.cc6.Pattern;

import java.util.*;

/**
 This class is responsible for finding all the possible patterns of rolls that can be used to satisfy
 the demand of cutting into smaller pieces of a given width, up to a maximum number of cuts per roll.

 It uses a heuristic algorithm to sort the rolls in decreasing order of their "value", defined as a
 combination of their demand and their possible waste, and then tries to find patterns that include as many high-value
 rolls as possible while respecting the maximum number of cuts and the maximum width of the rolls.
 */

public class PatternFinder {
    /**
     List of all the patterns found by the algorithm. Each pattern is represented by a list of integers,
     corresponding to the widths of the rolls that are used in that pattern.
    */
    private final ArrayList<ArrayList<Integer>> patterns;

    //List of all the rolls that are available for cutting.
    private final ArrayList<Roll> rolls;

    //Maximum width of a pattern.
    private final int maxRollWidth;

    // Maximum number of cuts per roll.
    private final int maxCuts;

    //List of the total demands for each unique roll width.
    private ArrayList<Integer> sortedDemands;
    
    /**
    Constructs a new PatternFinder object with the given parameters.
    @param rolls list of all the rolls that are available for cutting.
    @param maxRollWidth maximum width of a pattern.
    @param maxCuts maximum number of cuts that can be made in a single pattern.
    */
    public PatternFinder(ArrayList<Roll> rolls, int maxRollWidth, int maxCuts) {
        patterns = new ArrayList<>();
        this.rolls = rolls;
        this.maxRollWidth = maxRollWidth;
        this.maxCuts = maxCuts;

    }

    /**
    Finds all patterns that can satisfy the constraints using a heuristic algorithm.
    @param roll ArrayList of rolls to be cut
    */
    private void findOnePattern(ArrayList<Roll> roll) {
        ArrayList<Roll> sortedWidths = new ArrayList<>(roll);

        ArrayList<ArrayList<Integer>> patternsWithRolls = new ArrayList<>();

        // Sort the rolls in decreasing order of their "value", 
        // defined as a combination of their demand and their possible waste.
        for (int i = 0; i < sortedWidths.size(); i++) {
            int remainder = maxRollWidth;
            int rollsProduced = 0;
            ArrayList<Integer> patternWithRolls = new ArrayList<>();
            int item = 0;

            // Add rolls to the pattern until the maximum number of cuts is reached or the remainder is smaller than the next roll.
            while (!sortedWidths.isEmpty() && rollsProduced < maxCuts && remainder >= sortedWidths.get(item).getWidth()) {
                if (item < sortedWidths.size()) {
                    int width = sortedWidths.get(item).getWidth();
                    patternWithRolls.add(width);
                    rollsProduced++;
                    remainder -= width;
                    sortedWidths.remove(item);
                } else {
                    break;
                }
            }

            // Add the pattern to the list of patterns.
            patternsWithRolls.add(patternWithRolls);
        }

        // Add the last pattern with the remaining rolls.
        if (!sortedWidths.isEmpty() && sum(sortedWidths) <= maxRollWidth) {
            ArrayList<Integer> lastPattern = new ArrayList<>();
            for (Roll sortedWidth : sortedWidths) {
                lastPattern.add(sortedWidth.getWidth());
            }
            patternsWithRolls.add(lastPattern);
        }

        // Add all the patterns found to the list of patterns.
        patterns.addAll(patternsWithRolls);
    }

    /**
    Finds all possible patterns that can satisfy the demands by sorting the rolls based on their
    demand and the ratio of their width to the maximum width of the roll (possible waste produced), 
    and then calling the findOnePattern method iteratively.
    */
    public void findAllPatterns()  {
        /** 
         Create a map to store the values of each roll based 
         on the demand and the ratio of the width to the maximum width (possible waste produced)
        */
        Map<Integer, Double> values = new HashMap<>();
        for (Roll roll : rolls) {
            int width = roll.getWidth();
            double value = 0.6 * roll.getDemand() + 0.4 * ((double) (maxRollWidth - width) / width);
            values.put(width, value);
        }

        // Create a comparator to sort the rolls based on their values
        Comparator<Roll> rollComparator = (roll1, roll2) -> {
            // Get the values of the rolls
            double value1 = values.get(roll1.getWidth());
            double value2 = values.get(roll2.getWidth());

            // Compare the values
            return Double.compare(value2, value1);
        };

        // Sort the rolls
        rolls.sort(rollComparator);

        //this.sortedDemands = new int[uniqueRolls.size()];

        // Create a list of the total demands for each unique roll width
        findOnePattern(rolls);
    }

    /**
     * Returns the list of all the demands from unique roll sums.
     * @return sortedDemands.
     */
    public ArrayList<Integer> getSortedTotalDemands() {
        return sortedDemands;
    }

    /**
     * Returns the list of all the unique roll widths that occur in the patterns.
     * @return uniqueRolls.
     */
    public ArrayList<ArrayList<Integer>> getPatterns() {
       return patterns;
    }

    /**
     * Returns the sum of all widths in a pattern.
     * @param pattern ArrayList of patterns.
     * @return sum.
     */
    private static int sum(ArrayList<Roll> pattern) {
        int sum = 0;
        for (Roll roll : pattern) {
            sum += roll.getWidth();
        }
        return sum;
    }

    /**
     * Returns a two dimensional array storing the number of each unique roll in a pattern.
     * @return quantitiesInPattern.
     */
    public double[][] getQuantitiesInPattern() {
        ArrayList<Integer> uniqueRolls = new ArrayList<>();
        ArrayList<Integer> demands = new ArrayList<>();

        // iterate over each pattern and find the total demand for each unique roll.
        int counter = 0;
        for (ArrayList<Integer> pattern : patterns) {
            for (int i = 0; i < pattern.size(); i++) {
                // get the current roll and demand
                int currentItem = pattern.get(i);
                int currentDemand = rolls.get(i + counter).getDemand();
                int index = uniqueRolls.indexOf(currentItem);
                // if the roll is not in the list, add it to the list
                if (index == -1) {
                    uniqueRolls.add(currentItem);
                    demands.add(currentDemand);
                // if the roll is in the list, add the demand to the total demand
                } else {
                    int currentTotalDemand = demands.get(index);
                    demands.set(index, currentTotalDemand + currentDemand);
                }
            }
            counter += pattern.size();
        }

        //this.sortedDemands = demands.stream().mapToInt(i -> i).toArray();

        double[][] quantitiesInPatterns = new double[uniqueRolls.size()][patterns.size()];
        
        // iterate over each roll and pattern and count the number of times roll occurs in pattern
        for (int i = 0; i < uniqueRolls.size(); i++) {
            for (int j = 0; j < patterns.size(); j++) {
                int count = 0;
                for (int item : patterns.get(j)) {
                    if (item == uniqueRolls.get(i)) {
                        count++;
                    }
                }
                quantitiesInPatterns[i][j] = count;
            }
        }
        return quantitiesInPatterns;
    }

    /**
     * Returns the list of all the unique roll widths that occur in the patterns.
     * @return uniqueRolls.
     */
    public ArrayList<Integer> getWidths() {
        ArrayList<Integer> uniqueRolls = new ArrayList<>();
        ArrayList<Integer> demands = new ArrayList<>();

        for (int i = 0; i < rolls.size(); i++) {
            // get the current roll and demand
            int currentItem = rolls.get(i).getWidth();
            int currentDemand = rolls.get(i).getDemand();
            int index = uniqueRolls.indexOf(currentItem);
            // if the roll is not in the list, add it to the list
            if (index == -1) {
                uniqueRolls.add(currentItem);
                demands.add(currentDemand);
                // if the roll is in the list, add the demand to the total demand
            } else {
                int currentTotalDemand = demands.get(index);
                demands.set(index, currentTotalDemand + currentDemand);
            }
        }
        this.sortedDemands = demands;

        return uniqueRolls;
    }
}