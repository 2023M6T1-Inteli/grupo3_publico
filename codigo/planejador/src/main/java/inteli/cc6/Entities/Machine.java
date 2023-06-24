package inteli.cc6.Entities;
import jakarta.annotation.Nullable;
/**
 * The Machine class represents a machine used for cutting rolls of material.
 * It stores information about the maximum roll width and the maximum number of cuts that can be made.
 */
public class Machine {
    private Integer maxRollWidth;
    private Integer maxCuts;
    private Integer numberOfRuns;
    private Boolean multipleRuns;
    private Integer minimumWidth;
    /**
     * Constructs a new Machine object with the specified maximum roll width and maximum cuts.
     *
     * @param maxRollWidth the maximum width of a roll that can be cut by the machine
     * @param maxCuts the maximum number of cuts that can be made by the machine
     * @param multipleRuns if the inputs have multiple Ruins by the machine
     * @param numberOfRuns the number of amounts if the multipleRuns was true by the machine
     * @param minimumWidth the minimum width of a roll that can bem cut by the machine
     */
    public Machine(Integer maxRollWidth, Integer minimumWidth ,Integer maxCuts, @Nullable Boolean multipleRuns,@Nullable Integer numberOfRuns) {
        this.maxRollWidth = maxRollWidth;
        this.maxCuts = maxCuts;
        this.minimumWidth = minimumWidth;
        this.multipleRuns = (multipleRuns != null)? multipleRuns: false;
        this.numberOfRuns = (numberOfRuns != null)? numberOfRuns: 0;
    }
    /**
     * Retrieves the maximum roll width that can be cut by the machine.
     *
     * @return the maximum roll width
     */
    public Integer getRollWidthMax() {
        return this.maxRollWidth;
    }
    /**
     * Retrieves the maximum number of cuts that can be made by the machine.
     *
     * @return the maximum number of cuts
     */
    public Integer getMaxCuts() {
        return this.maxCuts;
    }
    /**
     * Retrieves the number of runs that can be made by the machine.
     *
     * @return the number of Runs
     */
    public Integer getNumberOfRuns() {
        return this.numberOfRuns;
    }
    /**
     * Retrieves the information about if have multiple runs by the machine.
     *
     * @return if have return true, if dont return false
     */
    public Boolean getMultipleRuns() {
        return this.multipleRuns;
    }
    /**
     * Retrieves the information about the min roll width by the machine.
     *
     * @return the minimul roll width
     */
    public Integer getMinimumWidth() {
        return this.minimumWidth;
    }
}