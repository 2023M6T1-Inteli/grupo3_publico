/**

Represents an Algorithm class that performs a POST request using axios.
@class Algorithm
*/
import axios from "axios";
import algorithmService from "../services/algorithmService.js";
class Algorithm {
/**

Sends a POST request to a specified URL with request body.
@static
@param {Object} req - The request object containing the request body.
@param {Object} res - The response object.
@memberof Algorithm
*/
static post(req, res) {
axios
.post("http://localhost:3000/", JSON.stringify(req.body), {
headers: {
'Content-Type': 'application/json'
}
})
.then(async (data) => {
    let newData = await algorithmService.getWaste(data.data);  
    res.json(newData);
});
}
}
export default Algorithm;