import React, { useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { ExportJsonCsv } from "react-export-json-csv";

export default function HomePage() {
  const [driverData, setDriverData] = useState({});
  const dummyData = {
    applicantInformation: {
      age: "12",
      applicantName: "Jubaer Tanjil Jami",
      birthDate: 986651967000,
      collegeStudied: "4",
      gradeSchoolStudied: "12",
      jobPosition: "Contractor",
      livingAddresses: ["Lalbagh", "Chattagram, Bangladesh"],
      livingAddressesFrom: [1641564012000, 1628776820000],
      livingAddressesTo: [1639836024000, 1639836024000],
      mobileNumber: "+1 (123) 124-232",
      physicalExamCertificateURL: "",
      physicalExamExpirationDate: 1643896767000,
      postGradStudied: "4",
      previousWorkFrom: 1638453567000,
      previousWorkInTheCompany: "Yes",
      previousWorkTo: 1644328767990,
      reasonForLeaving: "I don't like it herer",
      ss: "34",
      submissionDate: 1644328767990,
    },
    drivingExperience: {
      accidentRecords: {
        accidentDates: [1643983367000, 1643896982000],
        locationOfAccidents: ["Indiana", "California"],
        natureOfAccidents: ["Head On", "Rear End"],
        numberOfFatalities: ["12", "56"],
        numberOfPeopleInjured: ["12", "12"],
      },
      classOfEquipment: {
        straightTruck: {
          approximateNoOfMiles: "56",
          from: 1643810368000,
          to: 1644242368000,
        },
        tractorAndSemitrailers: {
          approximateNoOfMiles: "98",
          from: 1641650368000,
          to: 1644069568000,
        },
        tractorAndTripleTrailers: {
          approximateNoOfMiles: "34",
          from: 1643896768000,
          to: 1643983168000,
        },
        tractorAndTwoTrailers: {
          approximateNoOfMiles: "56",
          from: 1639663168000,
          to: 1643896768000,
        },
      },
      denialOfLicence: true,
      detailsAboutCrimes: {
        denialOfLicence: "bleh",
        felonyConviction: "gig ig",
        suspensionOfLicense: "bleh",
        unableToPerform: "yoy yo ",
      },
      driverLicenseList: {
        dates: [1643896768000, 1644069878000],
        endorsements: ["id ont now", "9348"],
        licenceUrl: [
          "https://firebasestorage.googleapis.com/v0/b/driver-tracking-c7772.appspot.com/o/%2B1%20(123)%20124-232%2FLicence0.jpg?alt=media&token=1a080422-eb96-4ef8-a69c-c87589470057",
          "https://firebasestorage.googleapis.com/v0/b/driver-tracking-c7772.appspot.com/o/%2B1%20(123)%20124-232%2FLicence1.jpg?alt=media&token=bdca0681-4493-4234-8fdc-aa2b44c3e763",
        ],
        licences: ["er", "23"],
        roadTestCertificateUrls: [
          "https://firebasestorage.googleapis.com/v0/b/driver-tracking-c7772.appspot.com/o/%2B1%20(123)%20124-232%2FRoadTestCertificate0.jpg?alt=media&token=3b89bb58-486a-4672-90c6-3d60cca99c05",
          "https://firebasestorage.googleapis.com/v0/b/driver-tracking-c7772.appspot.com/o/%2B1%20(123)%20124-232%2FRoadTestCertificate1.jpg?alt=media&token=a1500d72-c74c-4f87-9d94-98ce0430b5c6",
        ],
        states: ["Ohio", "New jersey"],
        types: ["bleh", "9er"],
      },
      felonyConviction: true,
      listOfDrivingAwards: [
        "Expert Driver Award(United States Postal Service)",
      ],
      listOfSpecialTraining: ["PTD/DDC", "HAZMAT"],
      listOfStateOperated: ["California", "Alabama"],
      numberOfAccidents: 2,
      suspensionOfLicense: true,
      trafficConvictionRecords: {
        charges: ["12", "142"],
        dates: [1644069800000, 1643897014000],
        locations: ["Indiana", "CAl"],
        penalites: ["12", "124"],
      },
      unableToPerform: true,
    },
    employmentHistory: {
      prevCompanyDOTRegulation: ["No"],
      prevCompanyMobileNum: ["+1 (124) 343"],
      prevCompanySubjectToFMCR: ["Yes"],
      prevEmployerName: ["kuddus ali"],
      prevEmploymentFrom: [1047132048176],
      prevEmploymentTo: [1118239252349],
      prevJobAddress: ["indiana"],
      prevJobLeavingReason: ["I didn't like it htere"],
      prevJobPosition: ["ceo"],
    },
    jobReferences: {
      jobRefererAddress: ["cali", "Jci", "124"],
      jobRefererName: ["kuddus", "hail", "INdia"],
      jobRefererNumber: ["+1 (122) 3", "+1 (343) 12", "+1345"],
    },
  };
  const [userData, setUserData] = useState({});

  const settingUserData = () => {
    var temp = {};

    Object.keys(dummyData.applicantInformation).forEach((key) => {
      if (
        key !== "livingAddresses" &&
        key !== "livingAddressesFrom" &&
        key !== "livingAddressesTo"
      ) {
        temp[key] = dummyData.applicantInformation[key];
      }

      if (
        key === "birthDate" ||
        key === "submissionDate" ||
        key === "previousWorkTo" ||
        key === "previousWorkFrom" ||
        key === "physicalExamExpirationDate"
      ) {
        temp[key] = new Date(dummyData.applicantInformation[key]);
      }

      if (key === "livingAddresses") {
        dummyData.applicantInformation[key].forEach((elem, index) => {
          temp[`livingAddress${index + 1}`] = elem;
          temp[`livingAddress${index + 1}From`] = new Date(
            dummyData.applicantInformation.livingAddressesFrom[index]
          );
          temp[`livingAddress${index + 1}To`] = new Date(
            dummyData.applicantInformation.livingAddressesTo[index]
          );
        });
      }
    });

    dummyData.jobReferences.jobRefererAddress.forEach((elem, index) => {
      temp[`jobReferrer${index + 1}Name`] =
        dummyData.jobReferences.jobRefererName[index];
      temp[`jobReferrer${index + 1}Number`] =
        dummyData.jobReferences.jobRefererNumber[index];
      temp[`jobReferrer${index + 1}Address`] = elem;
    });

    dummyData.employmentHistory.prevEmployerName.forEach((elem, index) => {
      temp[`pastEmployment${index + 1}prevCompanyDOTRegulation`] =
        dummyData.employmentHistory.prevCompanyDOTRegulation[index];

      temp[`pastEmployment${index + 1}prevCompanyMobileNum`] =
        dummyData.employmentHistory.prevCompanyMobileNum[index];

      temp[`pastEmployment${index + 1}prevCompanySubjectToFMCR`] =
        dummyData.employmentHistory.prevCompanySubjectToFMCR[index];

      temp[`pastEmployment${index + 1}prevEmployerName`] =
        dummyData.employmentHistory.prevEmployerName[index];

      temp[`pastEmployment${index + 1}prevEmploymentFrom`] = new Date(
        dummyData.employmentHistory.prevEmploymentFrom[index]
      );

      temp[`pastEmployment${index + 1}prevEmploymentTo`] = new Date(
        dummyData.employmentHistory.prevEmploymentTo[index]
      );

      temp[`pastEmployment${index + 1}prevJobPosition`] =
        dummyData.employmentHistory.prevJobPosition[index];

      temp[`pastEmployment${index + 1}prevJobAddress`] =
        dummyData.employmentHistory.prevJobAddress[index];

      temp[`pastEmployment${index + 1}prevJobLeavingReason`] =
        dummyData.employmentHistory.prevJobLeavingReason[index];
    });
    temp["unableToPerform"] = dummyData.drivingExperience.unableToPerform;
    temp["denialOfLicence"] = dummyData.drivingExperience.denialOfLicence;

    temp["suspensionOfLicense"] =
      dummyData.drivingExperience.suspensionOfLicense;
    temp["felonyConviction"] = dummyData.drivingExperience.felonyConviction;

    

    

    console.log(temp);
    setUserData([temp]);
  };

  const headers = [
    {
      key: "submissionDate",
      name: "Date",
    },
    {
      key: "applicantName",
      name: "Applicant Name",
    },
    {
      key: "jobPosition",
      name: "Position Applying For",
    },
    {
      key: "mobileNumber",
      name: "Phone",
    },
    {
      key: "age",
      name: "Age",
    },
    {
      key: "birthDate",
      name: "Date Of Birth",
    },
    {
      key: "ss",
      name: "SS#",
    },
    {
      key: "",
      name: "",
    },
  ];

  const json2csvFormatter = () => {};

  const getData = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="homepage">
      <div className="homepage-title">
        <h1>Driver Tracking Admin Page</h1>
      </div>
      <ExportJsonCsv headers={headers} items={userData} fileTitle="Driver Data">
        Export
      </ExportJsonCsv>

      <button onClick={settingUserData}>Data</button>
    </div>
  );
}
