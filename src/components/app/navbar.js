import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Translate'
import SearchIcon from '@material-ui/icons/Search'
import { FormattedMessage } from 'react-intl'

import Popover from '@material-ui/core/Popover'
import PatternMenu from '../menus/patterns'
import DocsMenu from '../menus/docs'
import CommunityMenu from '../menus/community'
import AccountMenu from '../menus/account'

export default function ButtonAppBar(props) {
  // Don't show on mobile
  if (props.app.mobile) return null

  const [patternAnchor, setPatternAnchor] = useState(null)
  const [docsAnchor, setDocsAnchor] = useState(null)
  const [communityAnchor, setCommunityAnchor] = useState(null)
  const [userAnchor, setUserAnchor] = useState(null)

  const handlePatternOpen = event => setPatternAnchor(event.currentTarget)
  const handleDocsOpen = event => setDocsAnchor(event.currentTarget)
  const handleCommunityOpen = event => setCommunityAnchor(event.currentTarget)
  const handleUserOpen = event => setUserAnchor(event.currentTarget)

  const handlePopoverClose = () => {
    setPatternAnchor(null)
    setDocsAnchor(null)
    setCommunityAnchor(null)
    setUserAnchor(null)
  }

  const patternsOpen = Boolean(patternAnchor)
  const docsOpen = Boolean(docsAnchor)
  const communityOpen = Boolean(communityAnchor)
  const userOpen = Boolean(userAnchor)

  const colors = {
    light: '#212529',
    dark: '#f8f9fa'
  }

  const style = {
    wrapper: {
      flexGrow: 1,
      width: '100%',
      margin: 0,
      padding: 0,
      background: props.app.theme === 'dark' ? colors.light : colors.dark,
      zIndex: 15
    },
    logo: {
      textDecoration: 'none',
      height: '42px',
      width: '42px',
      padding: '11px',
      display: 'inline-block',
      color: colors[props.app.theme]
    },
    button: {
      height: '64px',
      padding: '0 18px'
    },
    iconButton: {
      color: colors[props.app.theme]
    },
    spacer: {
      flexGrow: 1
    },
    darkModeIcon: {
      transform: 'rotate(26deg)'
    },
    lightModeIcon: {
      transform: 'rotate(26deg)'
    }
  }

  const popoverProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    disableRestoreFocus: true,
    elevation: 1
  }

  const buttonProps = {
    color: 'primary',
    size: 'large',
    style: style.button
  }
  buttonProps['aria-haspopup'] = 'true'

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar disableGutters={true}>
          <Link to="/" style={style.logo}>
            <Logo embed />
          </Link>
          <Button
            aria-owns={patternsOpen ? 'patterns-popover' : undefined}
            onMouseEnter={handlePatternOpen}
            {...buttonProps}
          >
            <FormattedMessage id="app.patterns" />
          </Button>
          <Popover
            id="patterns-popover"
            open={patternsOpen}
            anchorEl={patternAnchor}
            onClose={handlePopoverClose}
            {...popoverProps}
          >
            <PatternMenu app={props.app} />
          </Popover>

          <Button
            aria-owns={docsOpen ? 'docs-popover' : undefined}
            onMouseEnter={handleDocsOpen}
            {...buttonProps}
          >
            <FormattedMessage id="app.docs" />
          </Button>
          <Popover
            id="docs-popover"
            open={docsOpen}
            anchorEl={docsAnchor}
            onClose={handlePopoverClose}
            {...popoverProps}
          >
            <DocsMenu app={props.app} />
          </Popover>

          <Button
            aria-owns={communityOpen ? 'docs-popover' : undefined}
            onMouseEnter={handleCommunityOpen}
            {...buttonProps}
          >
            <FormattedMessage id="app.community" />
          </Button>
          <Popover
            id="community-popover"
            open={communityOpen}
            anchorEl={communityAnchor}
            onClose={handlePopoverClose}
            {...popoverProps}
          >
            <CommunityMenu app={props.app} />
          </Popover>

          <span style={style.spacer} />

          {props.app.account.username ? (
            <>
              <Button
                aria-owns={userOpen ? 'user-popover' : undefined}
                onMouseEnter={handleUserOpen}
                {...buttonProps}
              >
                <FormattedMessage id="app.account" />
              </Button>
              <Popover
                id="user-popover"
                open={userOpen}
                anchorEl={userAnchor}
                onClose={handlePopoverClose}
                {...popoverProps}
              >
                <AccountMenu app={props.app} />
              </Popover>
            </>
          ) : (
            <Button href="/login/" color="inherit" size="large" style={style.button}>
              <FormattedMessage id="app.logIn" />
            </Button>
          )}
          <IconButton
            style={style.iconButton}
            aria-label="menu"
            color="inherit"
            href="/search/"
            title={props.app.translate('app.search')}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            style={style.iconButton}
            aria-label="menu"
            color="inherit"
            href="/language/"
            title={props.app.translate(`i18n.${props.app.language}`)}
          >
            <LanguageIcon />
          </IconButton>
          <IconButton
            style={style.darkModeButton}
            aria-label="menu"
            onClick={props.app.toggleDarkMode}
            title={
              props.app.theme === 'dark'
                ? props.app.translate('app.lightMode')
                : props.app.translate('app.darkMode')
            }
          >
            {props.app.theme === 'dark' ? (
              <LightModeIcon style={style.lightModeIcon} />
            ) : (
              <DarkModeIcon style={style.darkModeIcon} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
