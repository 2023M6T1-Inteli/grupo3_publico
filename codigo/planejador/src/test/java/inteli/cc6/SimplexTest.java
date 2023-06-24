package inteli.cc6;

import inteli.cc6.Simplex.Simplex;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.*;

/*
 * This class tests the Simplex class.
 */
public class SimplexTest {

    /*
     * This test checks if the calculateInverse method is working properly.
     */
    @Test
    public void testCalculateInverse() {
        Simplex simplex = new Simplex(false, 0);
        double[][] matrix = {{1, 2}, {3, 4}};
        double[][] expectedInverse = {{-1.9999999999999998, 1.0}, {1.4999999999999998, -0.49999999999999994}};
        double[][] actualInverse = simplex.calculateInverse(matrix);
        assertArrayEquals(expectedInverse, actualInverse);
    }

    /*
     * This test checks if the simplex Algorithm is working properly by resolving a specific problem.
     * The output is the widths in the pattern repeated according to its quantity.
     */
    @Test
    public void testSimplex() {
        Simplex simplex = new Simplex(false, 0);
        double[][] matrix = {{4, 0}, {0, 2}};
        int[] demands = {100, 150};
        ArrayList<Integer> widths = new ArrayList<>();
        widths.add(3);
        widths.add(5);
        int maxRollWidth = 13;
        int maxKnives = 100;
        int maxIter = 100;
        int iter = 0;
        int minimumWidth = 0;
        simplex.simplex(matrix, demands, widths, maxRollWidth, maxKnives, maxIter, iter, minimumWidth);
        ArrayList<ArrayList<Integer>> expectedPatterns = new ArrayList<>();
        ArrayList<Integer> pattern1 = new ArrayList<>();
        pattern1.add(3);
        pattern1.add(3);
        pattern1.add(3);
        pattern1.add(3);
        ArrayList<Integer> pattern2 = new ArrayList<>();
        pattern2.add(3);
        pattern2.add(5);
        pattern2.add(5);
        expectedPatterns.add(pattern1);
        expectedPatterns.add(pattern2);
        assertEquals(expectedPatterns, simplex.getPatterns());
    }

    /*
     * This test checks if the createHomogeneousMatrix method is working properly.
     * The main diagonal is filled with the maximum number of each width that can fit in the roll.
     */
    @Test
    public void testCreateHomogeneousMatrix() {
        Simplex simplex = new Simplex(false, 0);
        ArrayList<Integer> widths = new ArrayList<>();
        widths.add(3);
        widths.add(5);
        int maxRollWidth = 13;
        int maxKnives = 100;
        double[][] expectedMatrix = {{4, 0}, {0, 2}};
        double[][] actualMatrix = simplex.createHomogeneousMatrix(widths, maxRollWidth, maxKnives);
        assertArrayEquals(expectedMatrix, actualMatrix);
    }
}