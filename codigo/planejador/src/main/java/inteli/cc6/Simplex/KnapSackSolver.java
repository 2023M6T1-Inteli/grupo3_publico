package inteli.cc6.Simplex;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;

/**
 * The KnapSackSolver class represents a solver for the knapsack problem.
 * It calculates the optimal solution for the knapsack given the maximum roll width and item values/weights.
 */
public class KnapSackSolver {
    private int maxRollWidth; // The maximum width of the roll (max weight of the knapsack)
    private int maxKnives; // The maximum Knives of the roll
    private int minimumWidth;

    /**
     * Constructs a KnapSackSolver object with the given maximum roll width.
     *
     * @param maxRollWidth  the maximum width of the roll for the knapsack
     */
    public KnapSackSolver(int maxRollWidth, int maxKnives, int minimumWidth) {
        this.maxRollWidth = maxRollWidth;
        this.maxKnives = maxKnives;
        this.minimumWidth = minimumWidth;
    }

    /**
     * Solves the unbounded knapsack problem and returns the optimal result.
     *
     * @param values  an array of item values
     * @param weights an ArrayList of item weights
     * @return the optimal result of the unbounded knapsack problem as a KnapSackResult object (maximum value and quantities of each item selected)
     */
    public KnapSackResult unboundedKnapsack(double values[], ArrayList<Integer> weights) {
        int n = values.length;
        HashSet<ArrayList<Integer>> uniquePatterns = new HashSet<>(); // Track unique patterns

        // The maximumValue array is initialized with zeros to store the maximum values for different roll widths.
        double[] maximumValue = new double[maxRollWidth + 1];
        for (int i = 0; i <= maxRollWidth; i++) {
            maximumValue[i] = 0;
        }

        // The nested loops iterate over the roll widths and items to determine the maximum value for each roll width.
        for (int i = 0; i <= maxRollWidth; i++) {
            for (int j = 0; j < n; j++) {
                if (weights.get(j) <= i) {
                    // The maximumValue array is updated with the maximum value at each roll width.
                    maximumValue[i] = Math.max(maximumValue[i], maximumValue[i - weights.get(j)] + values[j]);
                }
            }
        }

        // The findPattern method is called to determine the pattern of item quantities that leads to the optimal solution.
        int[] pattern = findPattern(values, weights, maximumValue, uniquePatterns);

        // The KnapSackResult object is created using the maximum value and the pattern array, and returned as the result.
        KnapSackResult result = new KnapSackResult(maximumValue[maxRollWidth], pattern);
        return result;
    }


    /**
     * Finds the pattern of item quantities that leads to the optimal solution.
     *
     * @param values         an array of item values
     * @param weights        an ArrayList of item weights
     * @param maximumValue   an array containing the maximum values for the knapsack
     * @param uniquePatterns a set to track unique patterns of item quantities
     * @return an array representing the quantities of each item selected for the knapsack
     */
    public int[] findPattern(double values[], ArrayList<Integer> weights, double[] maximumValue, HashSet<ArrayList<Integer>> uniquePatterns) {
        int n = values.length;

        int[] count = new int[n];

        for (int i = maxRollWidth; i > 0; ) {
            boolean found = false;
            for (int j = 0; j < n; j++) {
                if (weights.get(j) <= i && values[j] + (i - weights.get(j) >= 0 ? maximumValue[i - weights.get(j)] : 0) == maximumValue[i]) {
                    if (Arrays.stream(count).sum() < (maxKnives) && i >= minimumWidth) { // Check if number of total cuts doesn't exceed maxKnives + 1 and roll width is greater than or equal to minimumWidth
                        count[j]++;
                        i -= weights.get(j);
                        found = true;
                    }
                    break;
                }
            }
            if (!found) break;
        }

        ArrayList<Integer> patternList = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            patternList.add(count[i]);
        }

        if (!uniquePatterns.contains(patternList)) {
            uniquePatterns.add(patternList);
        } else {
            findPattern(values, weights, maximumValue, uniquePatterns);
        }

        int[] pattern = new int[n];
        for (int i = 0; i < n; i++) {
            pattern[i] = patternList.get(i);
        }

        return pattern;
    }
}
