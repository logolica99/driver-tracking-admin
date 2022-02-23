import "../styles/homepage.scss";
import React, { useState, useEffect, useContext } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { ExportJsonCsv } from "react-export-json-csv";

import { AuthContext } from "../contexts/AuthContext";

export default function HomePage() {
  const [authState, authDispatcher] = useContext(AuthContext);
  const [mainHeaders, setMainHeaders] = useState([]);

  const [userData, setUserData] = useState([]);
  const headers = [
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
    {key:"",name:""},
   
  ]

  const settingUserData = (dummyData) => {
    Object.keys(dummyData).forEach((mainKey) => {
      var temp = {};

      Object.keys(dummyData[mainKey].applicantInformation).forEach((key) => {
        if (
          key !== "livingAddresses" &&
          key !== "livingAddressesFrom" &&
          key !== "livingAddressesTo"
        ) {
          temp[key] = dummyData[mainKey].applicantInformation[key];
        }

        if (
          key === "birthDate" ||
          key === "submissionDate" ||
          key === "previousWorkTo" ||
          key === "previousWorkFrom" ||
          key === "physicalExamExpirationDate"
        ) {
          temp[key] = new Date(dummyData[mainKey].applicantInformation[key]);
        }

        if (key === "livingAddresses") {
          dummyData[mainKey].applicantInformation[key].forEach(
            (elem, index) => {
              temp[`livingAddress${index + 1}`] = elem;
              temp[`livingAddress${index + 1}From`] = new Date(
                dummyData[mainKey].applicantInformation.livingAddressesFrom[
                  index
                ]
              );
              temp[`livingAddress${index + 1}To`] = new Date(
                dummyData[mainKey].applicantInformation.livingAddressesTo[index]
              );
            }
          );
        }
      });

      dummyData[mainKey].jobReferences.jobRefererAddress.forEach(
        (elem, index) => {
          temp[`jobReferrer${index + 1}Name`] =
            dummyData[mainKey].jobReferences.jobRefererName[index];
          temp[`jobReferrer${index + 1}Number`] =
            dummyData[mainKey].jobReferences.jobRefererNumber[index];
          temp[`jobReferrer${index + 1}Address`] = elem;
        }
      );

      dummyData[mainKey].employmentHistory.prevEmployerName.forEach(
        (elem, index) => {
          temp[`pastEmployment${index + 1}prevCompanyDOTRegulation`] =
            dummyData[mainKey].employmentHistory.prevCompanyDOTRegulation[
              index
            ];

          temp[`pastEmployment${index + 1}prevCompanyMobileNum`] =
            dummyData[mainKey].employmentHistory.prevCompanyMobileNum[index];

          temp[`pastEmployment${index + 1}prevCompanySubjectToFMCR`] =
            dummyData[mainKey].employmentHistory.prevCompanySubjectToFMCR[
              index
            ];

          temp[`pastEmployment${index + 1}prevEmployerName`] =
            dummyData[mainKey].employmentHistory.prevEmployerName[index];

          temp[`pastEmployment${index + 1}prevEmploymentFrom`] = new Date(
            dummyData[mainKey].employmentHistory.prevEmploymentFrom[index]
          );

          temp[`pastEmployment${index + 1}prevEmploymentTo`] = new Date(
            dummyData[mainKey].employmentHistory.prevEmploymentTo[index]
          );

          temp[`pastEmployment${index + 1}prevJobPosition`] =
            dummyData[mainKey].employmentHistory.prevJobPosition[index];

          temp[`pastEmployment${index + 1}prevJobAddress`] =
            dummyData[mainKey].employmentHistory.prevJobAddress[index];

          temp[`pastEmployment${index + 1}prevJobLeavingReason`] =
            dummyData[mainKey].employmentHistory.prevJobLeavingReason[index];
        }
      );

      temp["unableToPerform"] =
        dummyData[mainKey].drivingExperience.unableToPerform;
      temp["denialOfLicence"] =
        dummyData[mainKey].drivingExperience.denialOfLicence;

      temp["suspensionOfLicense"] =
        dummyData[mainKey].drivingExperience.suspensionOfLicense;
      temp["felonyConviction"] =
        dummyData[mainKey].drivingExperience.felonyConviction;

      if (dummyData[mainKey].drivingExperience.accidentRecords) {
        dummyData[
          mainKey
        ].drivingExperience.accidentRecords.accidentDates.forEach(
          (elem, index) => {
            temp[`accident${index + 1}Date`] = new Date(
              dummyData[
                mainKey
              ].drivingExperience.accidentRecords.accidentDates[index]
            );
            temp[`accident${index + 1}Location`] =
              dummyData[
                mainKey
              ].drivingExperience.accidentRecords.locationOfAccidents[index];
            temp[`accident${index + 1}Nature`] =
              dummyData[
                mainKey
              ].drivingExperience.accidentRecords.natureOfAccidents[index];
            temp[`accident${index + 1}Fatalities`] =
              dummyData[
                mainKey
              ].drivingExperience.accidentRecords.numberOfFatalities[index];
            temp[`accident${index + 1}Injured`] =
              dummyData[
                mainKey
              ].drivingExperience.accidentRecords.numberOfPeopleInjured[index];
          }
        );
      }

      Object.keys(
        dummyData[mainKey].drivingExperience.classOfEquipment
      ).forEach((key) => {
        temp[`${key}Miles`] =
          dummyData[mainKey].drivingExperience.classOfEquipment[key][
            "approximateNoOfMiles"
          ];
        temp[`${key}From`] = new Date(
          dummyData[mainKey].drivingExperience.classOfEquipment[key]["from"]
        );
        temp[`${key}To`] = new Date(
          dummyData[mainKey].drivingExperience.classOfEquipment[key]["to"]
        );
      });

      Object.keys(
        dummyData[mainKey].drivingExperience.detailsAboutCrimes
      ).forEach((key) => {
        temp[key] =
          dummyData[mainKey].drivingExperience.detailsAboutCrimes[key];
      });
      if (dummyData[mainKey].drivingExperience.listOfDrivingAwards) {
        dummyData[mainKey].drivingExperience.listOfDrivingAwards.forEach(
          (elem, index) => {
            temp[`drivingAward${index + 1}`] = elem;
          }
        );
      }
      if (dummyData[mainKey].drivingExperience.listOfSpecialTraining) {
        dummyData[mainKey].drivingExperience.listOfSpecialTraining.forEach(
          (elem, index) => {
            temp[`specialTraining${index + 1}`] = elem;
          }
        );
      }

      if (dummyData[mainKey].drivingExperience.listOfStateOperated) {
        dummyData[mainKey].drivingExperience.listOfStateOperated.forEach(
          (elem, index) => {
            temp[`stateOperated${index + 1}`] = elem;
          }
        );
      }
      if (dummyData[mainKey].drivingExperience.driverLicenseList.licences) {
        dummyData[mainKey].drivingExperience.driverLicenseList.licences.forEach(
          (elem, index) => {
            temp[`licence${index + 1}ExpireDate`] = new Date(
              dummyData[mainKey].drivingExperience.driverLicenseList.dates[
                index
              ]
            );
            temp[`licence${index + 1}endorsement`] =
              dummyData[
                mainKey
              ].drivingExperience.driverLicenseList.endorsements[index];
            temp[`licence${index + 1}LicenceUrl`] =
              dummyData[mainKey].drivingExperience.driverLicenseList.licenceUrl[
                index
              ];
            temp[`licence${index + 1}Licence`] =
              dummyData[mainKey].drivingExperience.driverLicenseList.licences[
                index
              ];
            temp[`licence${index + 1}State`] =
              dummyData[mainKey].drivingExperience.driverLicenseList.states[
                index
              ];
            temp[`licence${index + 1}Type`] =
              dummyData[mainKey].drivingExperience.driverLicenseList.types[
                index
              ];
            temp[`roadTestCertificateUrl${index + 1}`] =
              dummyData[
                mainKey
              ].drivingExperience.driverLicenseList.roadTestCertificateUrls[
                index
              ];
          }
        );
      }
      if (dummyData[mainKey].drivingExperience.trafficConvictionRecords) {
        dummyData[
          mainKey
        ].drivingExperience.trafficConvictionRecords.dates.forEach(
          (elem, index) => {
            temp[`traficConviction${index + 1}Date`] = new Date(elem);
            temp[`traficConviction${index + 1}Charge`] =
              dummyData[
                mainKey
              ].drivingExperience.trafficConvictionRecords.charges[index];
            temp[`traficConviction${index + 1}Location`] =
              dummyData[
                mainKey
              ].drivingExperience.trafficConvictionRecords.locations[index];
            temp[`traficConviction${index + 1}Penalty`] =
              dummyData[
                mainKey
              ].drivingExperience.trafficConvictionRecords.penalites[index];
          }
        );
      }

      if(dummyData[mainKey].vehicleInventory){
        temp['carMaker'] = dummyData[mainKey].vehicleInventory['Maker']
        temp['carColor'] = dummyData[mainKey].vehicleInventory['carColor']
        temp['maintenanceDue'] = dummyData[mainKey].vehicleInventory['maintenanceDue']
        temp['maintenanceDueReceiptUrl'] = dummyData[mainKey].vehicleInventory['maintenanceDueReceiptUrl']
        temp['carModel'] = dummyData[mainKey].vehicleInventory['model']
        temp['plate'] = dummyData[mainKey].vehicleInventory['plate']
        temp['registeredState'] = dummyData[mainKey].vehicleInventory['registeredState']
        temp['vehicleNotes'] = dummyData[mainKey].vehicleInventory['vehicleNotes']
        temp['vin'] = dummyData[mainKey].vehicleInventory['vin']
        
      }

      console.log(temp.length)
      setUserData((prevData) => [...prevData, temp]);
    });
    authDispatcher({
      type: "UPDATE_LOADING",
      payload: {
        loading: false,
      },
    });
  };

  useEffect(() => {
    setUserData([]);
    authDispatcher({
      type: "UPDATE_LOADING",
      payload: {
        loading: true,
      },
    });
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
  
          settingUserData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setMainHeaders([]);
    userData.forEach((elem) => {
      Object.keys(elem).forEach((key) => {
        var temp = { key: key, name: key };
        setMainHeaders((prevData) => [...prevData, temp]);
      });
      return;
    });
  }, [userData]);

  return (
    <div className="homepage">
      <div className="homepage-title">
        <h1>Driver Tracking Admin Page</h1>
      </div>
      <ExportJsonCsv
        headers={mainHeaders}
        items={userData}
        fileTitle="Driver Data"
        className="homepage-exportButton"
      >
        EXPORT ALL DRIVER DATA
      </ExportJsonCsv>
    </div>
  );
}
