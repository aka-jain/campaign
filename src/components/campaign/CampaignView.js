import React from "react";
import LocalizedStrings from 'react-localization';

import { formatDate, getDays } from '../../utils/helper.js';
import { localizedStrings } from '../../utils/localization.js';
import styles from './Campaign.module.scss';
import price from '../../images/Price.png'
import file from '../../images/file.png'
import calendar from '../../images/calendar.png'
import report from '../../images/statistics-report.png'

let strings = new LocalizedStrings(localizedStrings)

function CampaignView(props) {
  strings.setLanguage(props.language);
  const { data, toggleModal, toggleDateModal } = props;
  return (
    <div className={styles.campaignWrrapper}>
    <div className={styles.campaignHead}>
      <div className={`${styles.campaignRowEle} ${styles.date}`}>
        {strings.date}
      </div>
      <div className={`${styles.campaignRowEle} ${styles.campaign}`}>
        {strings.campaign}
      </div>
      <div className={`${styles.campaignRowEle} ${styles.view}`}>
        {strings.view}
      </div>
      <div className={`${styles.campaignRowEle} ${styles.actions}`}>
        {strings.actions}
      </div>
    </div>
    <div className={styles.campaignBody}>
      {
        data && data.map((campaign, index) => {
          return (
            <div className={styles.campaignRow} key={index}>
              <div className={`${styles.campaignRowEle} ${styles.date}`}>
                {
                  formatDate(new Date(campaign.createdOn))
                }
                <div className="fs-14 italic text-blue-light">
                  {
                    campaign.daysFormattedSuffix && `${getDays(campaign.createdOn)} ${strings[campaign.daysFormattedSuffix]}`
                  }
                </div>
              </div>
              <div className={`${styles.campaignRowEle} ${styles.campaign} flex-row `}>
                  <img src={campaign.image_url} alt="campaign"/> 
                  <div className={`${styles.campaignEle}`}>
                    {campaign.name}
                    <span className="fs-14 italic text-blue-light">{campaign.region}</span>
                  </div>
              </div>
              <div className={`${styles.campaignRowEle} ${styles.view} fs-14 flex-row pointer`} onClick={() => toggleModal(campaign)}>
                <img src={price} alt="price"/> {strings.viewPricing}
              </div>
              <div className={`${styles.campaignRowEle} ${styles.actions}`}>
                <div className={`${styles.actionsEle}`}>
                  <img src={file} alt="file"/> <span className="desktop-only">CSV</span>
                </div>
                <div className={`${styles.actionsEle}`}>
                  <img src={report} alt="statistics"/> <span className="desktop-only">{strings.report}</span>
                </div>
                <div className={`${styles.actionsEle} pointer`} onClick={() => toggleDateModal(campaign)}>
                  
                  <img src={calendar} alt="calendar"/> <span className="desktop-only">{strings.scheduleAgain}</span>
                </div>
              </div>
              <div className="line-light" />
            </div>
          )
        })
      }
      {
        data.length === 0 &&
        <div className={styles.campaignRow}>No campaigns to show</div>
      }
    </div>
   </div>
  );
}

export default CampaignView;
