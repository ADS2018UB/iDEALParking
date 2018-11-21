import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const parkingForm = () => (
    <button class="btn" onclick="myFunction()">Click Me</button>
    <form id="myDIV" action="action_page.php" style="border:1px solid #ccc">
        <div class="contain">
            <h2>Add more details</h2>
            <p class="textp">Please fill in this form to add more <br/> details to your request.</p>
            <label for="size"><b>Size</b>
                <br/>
                <br/>
                <input id="insize" class="insize" type="number" placeholder="Enter Size" name="size"/>
            </label>
            <br/>
            <br/>
            <br/>
            <fieldset class="inputGroup">
                <legend>Choose some extras</legend>
                <br/>
                <label class="container"> Automatic gate
                    <input type="checkbox"/>
                    <span class="checkmark"></span>
                </label>
                <br/>
                <label class="container"> Internal illumination
                    <input type="checkbox"/>
                    <span class="checkmark"></span>
                </label>
                <br/>
                <label class="container"> Fournished
                    <input type="checkbox"/>
                    <span class="checkmark"></span>
                </label>
                <br/>
                <label class="container"> Renovated
                    <input type="checkbox"/>
                    <span class="checkmark"></span>
                </label>
                <br/>
                <div class="clearfix">
                    <button type="button" onclick="this.form.reset()" class="cancelbtn btn"> Cancel </button>
                    <button type="submit" class="signupbtn btn"> Search </button>
                </div>
            </fieldset>
        </div>
    </form>
);

export default parkingForm;

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}