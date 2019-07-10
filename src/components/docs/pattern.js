import React from "react";
import { FormattedMessage } from "react-intl";
import { capitalize } from "@freesewing/utils";
import { Link } from "gatsby"
import PatternOptions from "./pattern-options";
import PatternMeasurements from "./pattern-measurements";

const PatternIndexPage = props => {

  return (
    <React.Fragment>
      <h1>
        <FormattedMessage id={"patterns."+props.pattern+".title"} />
      </h1>
      <p>
        <FormattedMessage id={"patterns."+props.pattern+".description"} />
      </p>
      <h2>
        <FormattedMessage id="app.patternInstructions" />
      </h2>
      <ul className="links">
        <li>
          <Link to={"/docs/patterns/"+props.pattern+"/instructions"}>
            <FormattedMessage id="app.patternInstructions" />: {capitalize(props.pattern)}
          </Link>
        </li>
      </ul>
      <h2>
        <FormattedMessage id="app.patternOptions" />
      </h2>
      <p>
        <FormattedMessage id="app.options" />:
      </p>
      <PatternOptions pattern={props.pattern}/>
      <h2>
        <FormattedMessage id="app.requiredMeasurements" />
      </h2>
      <p><FormattedMessage id="app.howToTakeMeasurements" />:</p>
      <PatternMeasurements pattern={props.pattern} app={props.app}/>
      <h2>
        <FormattedMessage id="app.examples" />
      </h2>
      <p>
        <FormattedMessage id="intro.txt-showcase" />:
      </p>
      <ul className="links">
        <li>
          <Link to={"/showcase/patterns/"+props.pattern}>
            <FormattedMessage id="app.showcase" /> / {capitalize(props.pattern)}
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default PatternIndexPage;
