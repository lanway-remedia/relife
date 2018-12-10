/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import I18nUtils from '../utils/I18nUtils'
import SetLanguageActions from '../redux/language/SetLanguageRedux'
import StorageKeyConstants from '../constants/StorageKeyConstants'
import config from '../config'
class Language extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false,
      language: ''
    }
  }

  componentDidMount() {
    let currentLang = localStorage.getItem(StorageKeyConstants.SELECTED_LANGUAGE)
    currentLang = currentLang != config.LOCALE_MAP['en'] ? config.LOCALE_MAP[config.DEFAULT_LOCALE] : config.LOCALE_MAP['en']
    this.setState({
      language: I18nUtils.t(currentLang)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.newSelectedData !== nextProps.newSelectedData) {
      let newLanguage = nextProps.newSelectedData.lang
      this.setState({
        language: I18nUtils.t(newLanguage)
      })
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  setLang(lang) {
    this.props.setLanguageRequest(lang)
  }

  render() {
    let { dropdownOpen, language } = this.state
    return (
      <Dropdown className="btn-language" isOpen={dropdownOpen} toggle={() => this.toggle()}>
        <DropdownToggle caret>
          {language}
        </DropdownToggle>
        <DropdownMenu>
          {config.LOCALES.map((locale, index) => (
            <div key={index}>
              <DropdownItem
                className="btn btn-link"
                onClick={() => this.setLang(config.LOCALE_MAP[locale])}
              >
                {I18nUtils.t(config.LOCALE_MAP[locale])}
              </DropdownItem>
              <br />
            </div>
          )
          )}
        </DropdownMenu>
      </Dropdown>
    )
  }
}

Language.propTypes = {
  history: PropTypes.object,
  newSelectedData: PropTypes.object,
  setLanguageRequest: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    newSelectedData: state.setLanguage.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguageRequest: (lang) => dispatch(SetLanguageActions.setLanguageRequest(lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Language))
