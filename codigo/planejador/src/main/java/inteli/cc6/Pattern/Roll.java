package inteli.cc6.Pattern;

/**
The Roll class represents a roll with a given width and demand.
*/
public class Roll {
    private int width;
    private int demand;

    /**
    Constructs a new Roll object with the given width and demand.
    @param width the width of the roll
    @param demand the demand of the roll
    */
    public Roll(int width, int demand) {
        this.demand = demand;
        this.width = width;
    }

    /**
    Returns the width of the roll.
    @return the width of the roll
    */
    public int getWidth() {
        return width;
    }

    /**
    Returns the demand of the roll.
    @return the demand of the roll
    */
    public int getDemand() {
        return demand;
    }

    /**
    Returns a string representation of the roll.
    @return a string representation of the roll
    */
    public String toString() {
        return "(" + width + ", " + demand + ")";
    }
}
