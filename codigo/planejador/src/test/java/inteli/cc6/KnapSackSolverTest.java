package inteli.cc6;
import inteli.cc6.Simplex.KnapSackResult;
import inteli.cc6.Simplex.KnapSackSolver;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.*;

/**
 * This class tests the KnapSackSolver class.
 */
public class KnapSackSolverTest {
    /*
     * This test checks if the knapsack algorithm is working properly by resolving a specific math model.
     */
    @Test
    public void testKnapSackAlgorithm() {
        KnapSackSolver knapSackSolver = new KnapSackSolver(13, 5, 10 );
        ArrayList<Integer> widths = new ArrayList<>();
        widths.add(3);
        widths.add(5);

        double[] pi = new double[]{0.25, -0.125};
        KnapSackResult newPattern = knapSackSolver.unboundedKnapsack(pi, widths);
        int[] newColumn = newPattern.getQuantities();
        int[] expectedNewColumn = new int[]{2, 0};

        assertArrayEquals(expectedNewColumn, newColumn);
    }
}
