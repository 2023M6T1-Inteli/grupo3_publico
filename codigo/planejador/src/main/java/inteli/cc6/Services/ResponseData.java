package inteli.cc6.Services;

import java.util.ArrayList;

/**
 * The ResponseData class represents response data containing patterns, cuts per pattern and
 * the roll size.
 */
public class ResponseData {
    private ArrayList<ArrayList<Integer>> patterns;
    private int[] cutsPerPattern;
    private int rollWidth;

    /**
     * Constructs a new ResponseData object with the specified patterns and cuts per pattern.
     *
     * @param patterns        the patterns associated with the response data
     * @param cutsPerPattern  the cuts per pattern associated with the response data
     * @param rollWidth        the size of roll associated with the response data
     */
    public ResponseData(ArrayList<ArrayList<Integer>> patterns, int[] cutsPerPattern, int rollWidth) {
        this.patterns = patterns;
        this.cutsPerPattern = cutsPerPattern;
        this.rollWidth = rollWidth;
    }

    /**
     * Retrieves the patterns associated with the response data.
     *
     * @return the patterns associated with the response data
     */
    public ArrayList<ArrayList<Integer>> getPatterns() {
        return this.patterns;
    }

    /**
     * Retrieves the cuts per pattern associated with the response data.
     *
     * @return the cuts per pattern associated with the response data
     */
    public int[] getCutsPerPattern() {
        return this.cutsPerPattern;
    }

    /**
     * Retrieves the roll size associated with the response data.
     *
     * @return the roll size associated with the response data
     */
    public int getRollWidth() {
        return this.rollWidth;
    }
}
