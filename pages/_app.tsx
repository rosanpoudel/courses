import "/public/css/main.css";
import { reduxWrapper } from "../redux/store";
import { AppProps } from "next/app";
function MyApp({ Component }: AppProps) {
  return (
    <div>
      <Component />
    </div>
  );
}

export default reduxWrapper.withRedux(MyApp);
