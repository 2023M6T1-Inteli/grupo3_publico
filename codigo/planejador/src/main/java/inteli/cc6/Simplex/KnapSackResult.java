package inteli.cc6.Simplex;


 /* 
    The KnapSackResult class represents the result of a knapsack problem solution.
    It contains the maximun value and quantities of items selected for the knapsack.
 */
public class KnapSackResult {
    private double value; // The maximum value of the knapsack solution.
    private int[] quantities; // An array representing the quantities of each item selected for the knapsack.

    /**
     * Constructs a KnapSackResult object with the given value and quantities.
     *
     * @param value      the value of the knapsack solution
     * @param quantities an array representing the quantities of items selected
     *                   for the knapsack
     */
    public KnapSackResult(double value, int[] quantities) {
        this.value = value;
        this.quantities = quantities;
    }

    /**
     * @return the value of the knapsack solution
     */
    public double getValue() {
        return value;
    }

    /**
     * @return an array representing the quantities of items selected for the knapsack
     */
    public int[] getQuantities() {
        return quantities;
    }

    /**
     * @return a string representation of the KnapSackResult object
     * The string contains the value and quantities in a formatted manner.
     */

    public String toString() {
        return "[" + value + ", " + java.util.Arrays.toString(quantities) + "]";
    }
}
