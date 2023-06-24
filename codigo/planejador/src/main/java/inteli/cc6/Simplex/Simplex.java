package inteli.cc6.Simplex;
import org.apache.commons.math3.linear.*;

import java.util.ArrayList;

/**
 * This class implements the Simplex with Column Generation algorithm for linear programming.
 */
public class Simplex {
    double[] decisionVariables;
    Boolean isMultipleRun;
    Integer numberOfRuns;
    ArrayList<ArrayList<Integer>> patterns = new ArrayList<>();
    public Simplex (Boolean isMultipleRun, Integer numberOfRuns) {
        this.isMultipleRun = isMultipleRun;
        this.numberOfRuns = numberOfRuns;
    }
    /**
     * Calculates the inverse of a matrix using LU decomposition (apache commons library).
     * @param matrix The input matrix
     * @return The inverse of the matrix
     */
    public double[][] calculateInverse(double[][] matrix) {
        // Create RealMatrix object from the input matrix
        RealMatrix realMatrix = MatrixUtils.createRealMatrix(matrix);

        // Perform LU decomposition
        LUDecomposition luDecomposition = new LUDecomposition(realMatrix);

        // Get the inverse matrix
        RealMatrix inverse = luDecomposition.getSolver().getInverse();

        // Convert RealMatrix to double[][]
        double[][] inverseArray = inverse.getData();

        return inverseArray;
    }

    /**
     * Calculates the result of a linear system equation by multiplying the matrix with the independentTerms.
     * @param matrix The coefficient matrix of the system (representing a inverse matrix)
     * @param independentTerms The independent terms of the system
     * @return The solution of the linear system equation
     */
    private double[] calculateSystem(double[][] matrix, int[] independentTerms) {

        int n = matrix.length;
        int m = independentTerms.length;

        // Multiplication of the matrix with the independentTerms
        double[] result = new double[m];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                result[i] += matrix[i][j] * independentTerms[j];
            }
        }
        return result;
    }

    /**
     * Runs the simplex algorithm to solve a linear programming problem.
     * @param matrix A matrix representing the patterns
     * @param demands An array representing the demands of the items
     * @param widths An array list representing the widths of the patterns
     * @param maxRollWidth The maximum roll width
     * @param minimumWidth The minimum roll width
     * @param maxIter The maximum number of iterations
     * @param iter The current iteration count
     */
    public void simplex(double[][] matrix, int[] demands, ArrayList<Integer> widths, int maxRollWidth, int maxKnives, int maxIter, int iter, int minimumWidth) {
        minimumWidth = 0;
        int[] coefficients = getObjective(matrix, widths, maxRollWidth);

        // Calculate the inverse of the matrix
        double[][] inverseMatrix = calculateInverse(matrix);

        // Calculate the system variables (number of takes for each pattern)
        double[] variables = calculateSystem(inverseMatrix, demands);

        // Check if the solution is feasible
        if (variables != null) {
            decisionVariables = variables;

            // Transpose the matrix
            double[][] matrixTransposed = new double[matrix[0].length][matrix.length];
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix[0].length; j++) {
                    matrixTransposed[j][i] = matrix[i][j];
                }
            }

            // Calculate the inverse of the transposed matrix
            double[][] InverseMatrixTransposed = calculateInverse(matrixTransposed);

            // Calculate the dual variables (pi)
            double[] pi = calculateSystem(InverseMatrixTransposed, coefficients);

            // Solve the unbounded knapsack problem to find a new pattern
            KnapSackSolver knapSackSolver = new KnapSackSolver(maxRollWidth, maxKnives, minimumWidth);
            KnapSackResult newPattern = knapSackSolver.unboundedKnapsack(pi, widths);

            double maxValue = 0;
            int[] newColumn = newPattern.getQuantities();

            // Calculate the maximum value of the new pattern
            for (int i = 0; i < pi.length; i++) {
                for (int j = 0; j < pi.length; j++) {
                    maxValue += pi[i] * newColumn[i];
                }
            }

            // Calculate the cost of the new pattern
            double cost = 1 - maxValue;
            // Check if the pattern improves the solution
            if (cost < 0) {
                // Calculate the exit column
                double[] exitColumn = calculateSystem(inverseMatrix, newColumn);

                double minValue = Double.POSITIVE_INFINITY;
                int r = 0;

                // Find the index of the exit column
                for (int i = 0; i < exitColumn.length; i++) {
                    double value = variables[i] / exitColumn[i];
                    if (value < minValue) {
                        minValue = value;
                        r = i;
                    }
                }

                // Update the matrix with the new column
                for (int i = 0; i < matrix.length; i++) {
                    matrix[i][r] = newColumn[i];
                }

                // Generate the patterns from the updated matrix using the widths
                ArrayList<ArrayList<Integer>> patterns = new ArrayList<>();
                for (int j = 0; j < matrix[0].length; j++) {
                    ArrayList<Integer> pattern = new ArrayList<>();
                    for (int i = 0; i < matrix.length; i++) {
                        int quantity = (int)matrix[i][j];
                        for (int k = 0; k < quantity; k++) {
                            pattern.add(widths.get(i));
                        }
                    }
                    patterns.add(pattern);
                }
                this.patterns = patterns;

                // Run simplex recursively with the updated matrix
                if (iter < maxIter) {
                    // Verificar se a matriz seguinte é LD da matriz atual
                    boolean isNextMatrixLD = isMatrixSingular(matrix);

                    if (!isNextMatrixLD) {
                        simplex(matrix, demands, widths, maxRollWidth, maxIter, maxKnives, iter + 1, minimumWidth);
                    }
                }
            }
        }
    }

    /**
     * Calculates the coefficients of the objective function.
     * @param matrix A 2D array representing the simplex matrix
     * @param widths An array list representing the widths of the patterns
     * @param maxRollWidth The maximum roll width
     * @return The coefficients of the objective function
     */
    private int[] getObjective(double[][] matrix, ArrayList<Integer> widths, int maxRollWidth) {
        int[] coefficients = new int[matrix[0].length];

        // Calculate the coefficients for the patterns.
        // It is the maximum number of cuts for each pattern minus the width times the number of times the roll is used.
        for (int i = 0; i < matrix[0].length; i++) {
            for (int j = 0; j < widths.size(); j++) {
                coefficients[i] -= widths.get(j) * matrix[j][i];
            }
            coefficients[i] += maxRollWidth;
        }

        return coefficients;
    }

    /**
     * Gets the generated patterns.
     * @return The generated patterns
     */
    public ArrayList<ArrayList<Integer>> getPatterns() {
        return patterns;
    }

    /**
     * Gets the decision variables rounded up to the nearest integer.
     * @return The rounded decision variables
     */
    public int[] getDecisionVariables() {
        int[] decisionVariables = new int[this.decisionVariables.length];

        // Round up the decision variables to the nearest integer, because it is a integer programming problem
        for (int i = 0; i < this.decisionVariables.length; i++) {
            decisionVariables[i] = (int)Math.ceil(this.decisionVariables[i]);
            if (isMultipleRun && numberOfRuns != 0) {
                decisionVariables[i] = (decisionVariables[i] / numberOfRuns) * numberOfRuns;
            }
            if (decisionVariables[i] < 0) {
                decisionVariables[i] = 0;
            }
        }
        return decisionVariables;
    }

    /**
     * Creates a homogeneous matrix with diagonal elements representing the maximum number of cuts for each pattern.
     * @param widths An array list representing the widths of the patterns
     * @param maxRollWidth The maximum roll width
     * @return The homogeneous matrix
     */
    public double[][] createHomogeneousMatrix(ArrayList<Integer> widths, int maxRollWidth, int maxKnives) {
        // a quantidade de cortes em um rolo nunca pode exceder maxKnives + 1
        int maxCuts = maxKnives + 1;
        double[][] homogeneousMatrix = new double[widths.size()][widths.size()];
        for (int i = 0; i < widths.size(); i++) {
            for (int j = 0; j < widths.size(); j++) {
                if (i == j) homogeneousMatrix[i][i] = homogeneousMatrix[i][j] = Math.min(maxRollWidth / widths.get(i), maxCuts);
            }
        }
        return homogeneousMatrix;
    }
    /**
     * Verifica se a matriz é LD (matriz singular).
     * @param matrix A matriz a ser verificada
     * @return true se a matriz for LD (matriz singular), false caso contrário
     */
    private boolean isMatrixSingular(double[][] matrix) {
        // Create RealMatrix object from the input matrix
        RealMatrix realMatrix = MatrixUtils.createRealMatrix(matrix);

        // Perform LU decomposition
        LUDecomposition luDecomposition = new LUDecomposition(realMatrix);

        // Verificar se a matriz é singular
        return !luDecomposition.getSolver().isNonSingular();
    }
}
