// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Node Libs
import _ from 'lodash';

// Custom Libs
import currencies from '../../../libs/currencies.json';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class AppSettings extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.setState(this.props.appSettings);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value}, () => {
      this.props.updateSettings('appSettings', this.state);
    });
  }

  render() {
    const currenciesKeys = _.keys(currencies);
    const currenciesOptions = currenciesKeys.map(key => {
      let optionKey = currencies[key]['code'];
      let optionValue = currencies[key]['code'];
      let optionLabel = currencies[key]['name'];
      return (
        <option value={optionValue} key={optionKey}>
          {optionLabel}
        </option>
      );
    });

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Default Language</label>
              <select
                name="language"
                value={this.state.language}
                onChange={this.handleInputChange}>
                <option value="en">English</option>
                <option value="vi">Vietnamese</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Default Currency</label>
              <select
                name="currency"
                value={this.state.currency}
                onChange={this.handleInputChange}>
                {currenciesOptions}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Sound</label>
              <select
                name="sound"
                value={this.state.sound}
                onChange={this.handleInputChange}>
                <option value="default">Default</option>
                <option value="cs">Counter Strike</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Muted?</label>
              <label className="switch">
                <input
                  name="muted"
                  type="checkbox"
                  checked={this.state.muted}
                  onChange={this.handleInputChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppSettings.propTypes = {
  appSettings: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(AppSettings);;
