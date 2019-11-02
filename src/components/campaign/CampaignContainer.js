import React, { Component } from "react";
import DatePicker from "react-datepicker";
import LocalizedStrings from 'react-localization';

import CampaignView from './CampaignView';
import Modal from '../modal/Modal';
import * as constants from '../../utils/constants.js';
import { data } from '../../utils/data.js';
import { localizedStrings } from '../../utils/localization.js';
import styles from './Campaign.module.scss';

let strings = new LocalizedStrings(localizedStrings)

class CampaignContainer extends Component {

  // Ids would be like
  //   1 -> upcoming
  //   2 -> Live
  //   3 -> Past
  state = {
    activeCampaignId: 1,
    originalData: data,
    data: [],
    isPricingModalOpen: false,
    pricingData: {},
    isDateModalOpen: false,
    selectedCampaign: {},
    selectedDate: new Date(),
    isReschedulingDone: false
  }

  selectCampaign(activeCampaignId) {
    let filteredData = [];
    const { originalData } = this.state;
    const currentTime = new Date().getTime();
    switch (activeCampaignId) {
      case constants.CAMPAIGN_ID.upcoming:
        filteredData = originalData.filter((ele) => {
          if (currentTime < ele.createdOn) {
            ele.daysFormattedSuffix = 'daysAhead'
            return ele
          }
          return false
        })

        break;
      case constants.CAMPAIGN_ID.live:
        filteredData = originalData.filter((ele) => {
          // check for 1 day diff
          if (Math.abs(currentTime - ele.createdOn) < 86400000) {
            return true
          }
          return false
        })
        filteredData.daysFormattedSuffix = null;
        break;
      case constants.CAMPAIGN_ID.past:
        filteredData = originalData.filter((ele) => {
          if (currentTime > ele.createdOn && currentTime - ele.createdOn > 86400000) {
            ele.daysFormattedSuffix = 'daysAgo'
            return ele
          }
          return false
        })
        break;
      default :
        return null
    }
    this.setState(prevState => ({
      activeCampaignId,
      data: filteredData
    }))
  }

  componentDidMount() {
    const currentTime = new Date().getTime();
    const filteredData = this.state.originalData.filter((ele) => {
      if (currentTime < ele.createdOn) {
        ele.daysFormattedSuffix = 'daysAhead'
        return ele
      }
      return false
    })

    strings.setLanguage(this.props.language);

    this.setState(prevState => ({
      data: filteredData
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    const { isReschedulingDone } = this.state;
    if (isReschedulingDone !== prevState.isReschedulingDone) {
      this.selectCampaign(this.state.activeCampaignId);
      this.setState(prevState => ({
        isReschedulingDone: false
      }))
    }
  }

  // render Campaign navbar list - (upcoming. padst and present)
  renderCampaignHeader() {
    const navElementClass = `fs-18 text-blue-dark pointer ${styles.campaignNavEle}`;
    const { activeCampaignId } = this.state;
    strings.setLanguage(this.props.language);
    return (
      <React.Fragment>
        <h1 className="fs-44">{strings.manageCampaigns}</h1>
        <div className="d-flex justify-start relative expand">
          <div 
            className={activeCampaignId ===  constants.CAMPAIGN_ID.upcoming ? `${navElementClass} active` : `${navElementClass}`}
            onClick={() => this.selectCampaign(constants.CAMPAIGN_ID.upcoming)}
          >
            {strings.upcoming}
          </div>
          <div 
            className={activeCampaignId ===  constants.CAMPAIGN_ID.live ? `${navElementClass} active` : `${navElementClass}`}
            onClick={() => this.selectCampaign(constants.CAMPAIGN_ID.live)}
          >
            {strings.live}
          </div>
          <div 
            className={activeCampaignId ===  constants.CAMPAIGN_ID.past ? `${navElementClass} active` : `${navElementClass}`}
            onClick={() => this.selectCampaign(constants.CAMPAIGN_ID.past)}
          >
            {strings.past}
          </div>
          <div className="line-light" />
        </div>
      </React.Fragment>
    )
  }

  // Modal operations

  toggleModal(data = {}) {
    this.setState(prevState => ({
      isPricingModalOpen: !this.state.isPricingModalOpen,
      pricingData: data
    }))
  }

  renderModalBody() {
    const { pricingData } = this.state

    return (
      <div className={styles.pricingWrapper}>
        <div className={styles.pricingHead}>
          <img src={pricingData.image_url} alt="price"/>
          <div className={styles.pricingName}>
            {pricingData.name}
            <span className="text-blue-light"> {pricingData.region} </span>
          </div>
          
        </div>
        <h2 className="d-flex justify-start">
          Pricing
        </h2>
        {
          pricingData.price && pricingData.price.map((price, index) => {
            return(
              <div className={styles.pricingValue} key={`${index}-price`}>
                <span className="text-blue-light">
                  {price.type}
                </span>
                <span className="text-blue-dark w-600">
                  {price.value}
                </span>
              </div>
            )
          })
        }
        <div className="btn btn-pri mt-2" onClick={() => this.toggleModal()}>Close</div>
      </div>
    )
  }

  // date modal
  toggleDateModal(data = {}) {
    this.setState(prevState => ({
      isDateModalOpen: !this.state.isDateModalOpen,
      selectedCampaign: data
    }))
  }

  renderDateModalBody(campaign = {}) {
    return (
      <DatePicker
        selected={this.state.selectedDate}
        startDate={new Date(this.state.selectedCampaign.createdOn)}
        onChange={date => this.handleDateChange(date)}
        inline
        showYearDropdown
      />
    )
  }

  handleDateChange(date) {
    const rescheduleData = this.state.originalData.map((ele) => {
      if (this.state.selectedCampaign.id === ele.id) {
        ele.createdOn = date.getTime();
      }
      return ele
    })
    this.setState(prevState => ({
      selectedDate: date,
      originalData: rescheduleData,
      isReschedulingDone: true
    }), () => {
      this.toggleDateModal()
    })
  }

  render() {
    const { activeCampaignId, data, isPricingModalOpen, isDateModalOpen } = this.state;
    const { language } = this.props;
    return (
      <div className="d-flex justify-center pd-top-80">
        <Modal
          isOpen={isPricingModalOpen}
          onClose={() => this.toggleModal()}
          body={this.renderModalBody()}
        />
        <Modal
          isOpen={isDateModalOpen}
          onClose={() => this.toggleDateModal()}
          body={this.renderDateModalBody()}
        />
        <div className="container flex-column align-start">
          {this.renderCampaignHeader()}
          <CampaignView 
            campaignId={activeCampaignId}
            data={data}
            toggleModal={(e, data) => this.toggleModal(e, data)}
            toggleDateModal={(e, data) => this.toggleDateModal(e, data)}
            language={language}
          />
        </div>
      </div>
    );
  }
}

export default CampaignContainer;
