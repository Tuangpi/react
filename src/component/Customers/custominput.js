import { useInput } from "react-admin";
import { auth } from "../../firebase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// const CustomInput = (props) => {
//   const {
//     field,
//   } = useInput(props);

//   return (
//     <Select label="Sex" {...field}>
//       <MenuItem value="M">Male</MenuItem>
//     </Select>
//   );
// };
// export default CustomInput;

const CustomInput = ({ source, defaultValue }) => {
  const { id, field, fieldState } = useInput({ source, defaultValue });

  return (
    <label htmlFor={id}>
      <input type="hidden" id={id} {...field}/>
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </label>
  );
};
export default CustomInput;
