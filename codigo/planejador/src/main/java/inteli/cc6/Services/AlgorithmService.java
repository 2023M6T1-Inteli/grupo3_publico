package inteli.cc6.Services;

import inteli.cc6.Pattern.PatternFinder;

import java.util.ArrayList;

import inteli.cc6.Entities.Information;
import inteli.cc6.Pattern.Roll;
import inteli.cc6.Simplex.Simplex;

/**
 * The AlgorithmService class provides algorithms for processing and analyzing data related to rolls and patterns.
 */
public class AlgorithmService {

    private TransformData parserData;
    private ArrayList<Roll> rolls;
    private Integer rollWidth;
    private Integer maxCuts;
    PatternFinder patternFinder;
    private ArrayList<Integer> uniqueWidths;
    private ArrayList<Integer> sortedDemands;
    private int[] uniqueDemands;
    private int maxKnives;
    private int minimumWidth;
    private Boolean isMultipleRuns;
    private Integer numberOfRuns;

    /**
     * Constructs an AlgorithmService object with the specified information.
     *
     * @param information the information used for initialization
     */
    public AlgorithmService(Information information) {
        parserData = new TransformData(information.getFileName());
        rolls = parserData.getRolls();
        rollWidth = information.getInformationMachine().getRollWidthMax();
        maxCuts = information.getInformationMachine().getMaxCuts();
        maxKnives = (information.getInformationMachine().getMaxCuts()) - 1;
        minimumWidth = information.getInformationMachine().getMinimumWidth();
        isMultipleRuns = information.getInformationMachine().getMultipleRuns();;
        numberOfRuns = information.getInformationMachine().getNumberOfRuns();
    }

    /**
     * Finds patterns in the rolls and initializes the uniqueWidths and sortedDemands lists.
     */
    private void Patterns() {
        patternFinder = new PatternFinder(rolls, rollWidth, maxCuts);

        uniqueWidths = patternFinder.getWidths();
        sortedDemands = patternFinder.getSortedTotalDemands();

        uniqueDemands = sortedDemands.stream().mapToInt(i -> i).toArray();
    }

    /**
     * Retrieves the simplex algorithm result.
     *
     * @return the response data containing patterns and decision variables
     */
    public ResponseData getSimplex() {
        Patterns();
        Simplex simplex = new Simplex(isMultipleRuns, numberOfRuns);
        double[][] matrix = simplex.createHomogeneousMatrix(uniqueWidths, rollWidth, maxCuts);
        simplex.simplex(matrix, uniqueDemands, uniqueWidths, rollWidth, maxKnives, 999999, 0, minimumWidth);
        ResponseData response = new ResponseData(simplex.getPatterns(), simplex.getDecisionVariables(), rollWidth);
        return response;
    }
}