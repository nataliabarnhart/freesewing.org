import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Blockquote from '@freesewing/components/Blockquote'
import Robot from '@freesewing/components/Robot'
import Icon from '@freesewing/components/Icon'
import DraftEvents from './events/'
import useUiMdx from '../../hooks/useUiMdx'
import Mdx from '../mdx'

const DraftError = ({ error, draftEvents, updatePatternData, setCrashReport, app }) => {
  const uiMdx = useUiMdx()
  // Style
  const styles = {
    errorWrapper: {
      maxWidth: '800px',
      margin: 'auto'
    },
    error: {
      overflowX: 'auto',
      fontSize: '80%',
      fontFamily: `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  }

  return (
    <div style={styles.errorWrapper} data-test="error">
      <div style={styles.header}>
        <h1>{uiMdx['errors/draft'].title}</h1>
        <Robot pose="fail" size={150} />
      </div>
      <Blockquote type="note">
        <Mdx node={uiMdx['errors/draft']} />
        <p style={{ textAlign: 'center' }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => setCrashReport(true)}
          >
            <Icon icon="github" style={{ marginRight: '0.5rem' }} />
            <FormattedMessage id="app.reportThisOnGithub" />
          </Button>
        </p>
      </Blockquote>
      {draftEvents}
    </div>
  )
}

export default DraftError
