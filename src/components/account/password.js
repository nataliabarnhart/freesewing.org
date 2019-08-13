import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const AccountPassword = props => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [currentReveal, setCurrentReveal] = useState(false)
  const [newReveal, setNewReveal] = useState(false)

  const updateCurrentPassword = evt => setCurrentPassword(evt.target.value)
  const updateNewPassword = evt => setNewPassword(evt.target.value)

  return (
    <React.Fragment>
      <TextField
        id="newPassword"
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: 'account.newPassword' })}
        margin="normal"
        variant="outlined"
        value={newPassword}
        type={newReveal ? 'text' : 'password'}
        onChange={updateNewPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <span
                role="img"
                aria-label="reveal"
                onClick={() => setNewReveal(!newReveal)}
                className="poh"
              >
                {newReveal ? (
                  <span role="img" aria-label="show">
                    👀{' '}
                  </span>
                ) : (
                  <span role="img" aria-label="show">
                    🙈{' '}
                  </span>
                )}
              </span>
            </InputAdornment>
          )
        }}
      />
      <p style={{ textAlign: 'right' }}>
        <Button size="large" variant="outlined" color="primary" href="/account/settings">
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={() =>
            props.app.backend.saveAccount(
              { password: newPassword },
              props.app.frontend.intl.formatMessage({ id: 'account.password' })
            )
          }
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  )
}

export default AccountPassword
