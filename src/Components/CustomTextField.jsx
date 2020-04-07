
/* General Imports --------------------------------------------------------------- */
import React from "react";


/* Material UI Imports ----------------------------------------------------------- */
import TextField from "@material-ui/core/TextField";


/* Component --------------------------------------------------------------------- */


export const CustomTextField = React.forwardRef((props, ref) => {

    /*

    REQUIRED props:
    * label (label of the input field)

    OPTIONAL props:
    * value (initial value)
    * className (actual classname strings)
    * variant (standard, outlined or filled)
    * type (e.g. text, password) -> See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types

    * required
    * disabled
    * helperText

    * onChange (function handler for value change (when focused))
    * onTab (function handler for pressed Tab keys (when focused))
    * onEnter (function handler for pressed Enter keys (when focused))
    * onEscape (function handler for pressed Escape keys (when focused))

    * ref (the react-ref belonging to the actual input)

    */

    //const [value, setValue] = React.useState("value" in props ? props["value"] : "");

    const handleChange = (event) => {
        //setValue(event.target.value);
        if ("onChange" in props) {
            props.onChange(event.target.value);
        }
    };

    const handleKeyDown = (event) => {
        if ("onTab" in props && event.which === 9) {
            event.preventDefault();
            props.onTab(event.target.value);
        } else if ("onEnter" in props && event.which === 13) {
            event.preventDefault();
            props.onEnter(event.target.value);
        } else if ("onEscape" in props && event.which === 27) {
            console.log("Triggering Escape");
            event.preventDefault();
            props.onEscape(event.target.value);
        }
    };

    const handleBlur = (event) => {
        if ("onBlur" in props) {
            props.onBlur(event.target.value);
        }
    };

    return (
        <TextField fullWidth={("fullWidth" in props) ? props["fullWidth"] : false}
                   className={("className" in props) ? props["className"] : ""}
                   type={("type" in props) ? props["type"] : "text"}

                   required={("required" in props) ? props["required"] : false}
                   disabled={("disabled" in props) ? props["disabled"] : false}
                   helperText={("helperText" in props) ? props["helperText"] : ""}

                   variant={("variant" in props) ? props["variant"] : "standard"}
                   multiline={("multiline" in props) ? props["multiline"] : false}
                   rows={("rows" in props) ? props["rows"] : "1"}
                   rowsMax={("rowsMax" in props) ? props["rowsMax"] : "1"}

                   value={props.value}
                   inputRef={ref}
                   onChange={handleChange}
                   onKeyDown={handleKeyDown}
                   onBlur={handleBlur}
                   label={props.label}/>
    );
});
