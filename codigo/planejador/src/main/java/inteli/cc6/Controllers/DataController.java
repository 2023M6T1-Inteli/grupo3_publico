package inteli.cc6.Controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import inteli.cc6.Entities.Information;
import inteli.cc6.Services.ResponseData;
import inteli.cc6.Services.AlgorithmService;

/**
 * This class represents a REST controller for handling data-related operations.
 */
@RestController
public class DataController {

    /**
     * Handles the HTTP POST request to process data and return the response.
     *
     * @param information The information object containing the data to be processed.
     * @return The ResponseData object representing the result of the data processing.
     */
    @PostMapping("/")
    public ResponseData Post(@RequestBody Information information) {
        AlgorithmService processing = new AlgorithmService(information);
        return processing.getSimplex();
    }

}

