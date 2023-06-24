package inteli.cc6.Entities;

/**
 * The Information class represents a piece of information,
 * which consists of a file name and a machine object.
 */
public class Information {

    private String fileName; // The name of the file containing the information.
    private Machine informationMachine; // The machine object associated with the information.

    /**
     * Retrieves the machine object associated with this information.
     *
     * @return The machine object associated with this information.
     */
    public Machine getInformationMachine() {
        return informationMachine;
    }

    /**
     * Retrieves the file name associated with this information.
     *
     * @return The file name associated with this information.
     */
    public String getFileName() {
        return fileName;
    }

}

