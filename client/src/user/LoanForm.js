import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import toastr from 'toastr';
const LoanForm = () => {
  const [message, setMessage] = useState('');
  const modelRef = useRef(null);
  const [pan, setPan] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [bankStmt, setBankStmt] = useState('');
  const [photo, setPhoto] = useState('');
  const [profession, setProfession] = useState('');

  const EmployeeDatails = useRef(null);
  const BasicDetails = useRef(null);
  const KYCDetails = useRef(null);
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const [citySelect, setCitySelect] = useState({});
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [stateSelect, setStateSelect] = useState({});
  const [employeeProfile, setEmployeeProfile] = useState({
    fname: '',
    lname: '',
    fathername: '',
    email: '',
    dob: '',
    mobile: '',
    address: '',
    address2: '',
    zip: '',
    companyName: '',
    designation: '',
    currentCompanyExperience: '',
    totalExperience: '',
    monthlyIncome: '',
    annualIncome: '',
    adhaarNo: '',
    panNo: '',
    bankName: '',
    accountNo: '',
    IFSCcode: '',
    loanAmount: '',
    emi: '',
  });
  const options = [
    { value: 'Delhi', label: 'Delhi' },
    { value: 'UP', label: 'UP' },
    { value: 'Bihar', label: 'Bihar' },
  ];

  const LoanPurposeHandler = (tat) => {
    setLoanPurpose(tat.value);
  };

  const ProfessionHandler = (tat) => {
    setProfession(tat.value);
  };

  const LoanAmountHandler = (tat) => {
    setLoanAmount(tat.value);
  };

  const validateSelectOptions = () => {
    let disable = true;
    if (loanPurpose && profession && loanAmount) {
      disable = false;
    }
    return disable;
  };

  const OptionHandler = (tat) => {
    setStateSelect(tat);
  };

  const options1 = [
    { value: 'Aligarh', label: 'Aligarh' },
    { value: 'Agra', label: 'Agra' },
    { value: 'MuradaBad', label: 'MuradaBad' },
  ];

  const OptionHandler1 = (tat) => {
    setCitySelect(tat);
  };

  const LoanPurpose = [
    { value: 'Education Loan', label: 'Education' },
    { value: 'Personal Loan', label: 'Personal' },
  ];

  const LoanAmount = [
    { value: '1 Lakh', label: '1Lakh' },
    { value: '2 Lakh', label: '2Lakh' },
  ];

  const Profession = [
    { value: 'Salried', label: 'Salried' },
    { value: 'BussinessMan', label: 'BussinessMan' },
  ];

  const changeBox = () => {
    setCheckBoxStatus(!checkBoxStatus);
  };

  const ClickEmployeeDetails = () => {
    EmployeeDatails.current.click();
  };

  const BasicDetailsFunc = () => {
    BasicDetails.current.click();
  };
  const KYCFunc = () => {
    KYCDetails.current.click();
  };
  const AdhaarUpload = (e) => {
    setAdhaar(e.target.files[0]);
  };
  const PanUpload = (e) => {
    setPan(e.target.files[0]);
  };
  const PhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };
  const BankStmtUpload = (e) => {
    setBankStmt(e.target.files[0]);
  };
  const checkFunc = () => {
    return (
      <>
        <div className="form-row my-3 row">
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              id="loanAmount"
              name="loanAmount"
              value={employeeProfile.loanAmount}
              onChange={ProfileChangeHandler}
              placeholder="Active Loan Amount"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              id="emi"
              name="emi"
              value={employeeProfile.emi}
              onChange={ProfileChangeHandler}
              placeholder="EMI per Month"
            />
          </div>
        </div>
      </>
    );
  };

  const ProfileChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEmployeeProfile({
      ...employeeProfile,
      [name]: value,
    });
  };

  const SubmitDetails = async () => {
    let submit = 0;
    let employeeProfileForm = {
      FirstName: employeeProfile.fname,
      LastName: employeeProfile.lname,
      FatherName: employeeProfile.fathername,
      Email: employeeProfile.email,
      DOB: employeeProfile.dob,
      Mobile: employeeProfile.mobile,
      CurrentAddress: employeeProfile.address,
      CurrentAddress2: employeeProfile.address2,
      State: stateSelect.value,
      City: citySelect.value,
      ZIP: employeeProfile.zip,
      CompanyName: employeeProfile.companyName,
      Designation: employeeProfile.designation,
      CurrentCompanyExperience: employeeProfile.currentCompanyExperience,
      TotalExperience: employeeProfile.totalExperience,
      MonthlyIncome: employeeProfile.monthlyIncome,
      AnnualIncome: employeeProfile.annualIncome,
      AdhaarNo: employeeProfile.adhaarNo,
      PanNo: employeeProfile.panNo,
      BankName: employeeProfile.bankName,
      AccountNo: employeeProfile.accountNo,
      IFSCcode: employeeProfile.IFSCcode,
      LoanAmount: employeeProfile.loanAmount,
      EMI: employeeProfile.emi,
      adhaar: adhaar,
      pan: pan,
      bankStmt: bankStmt,
      photo: photo,
      loanPurpose: loanPurpose,
      loanAmount: loanAmount,
      profession: profession,
    };

    Object.keys(employeeProfileForm).map((key) => {
      if (
        employeeProfileForm[key] === '' ||
        employeeProfileForm[key] === null ||
        employeeProfileForm[key] === undefined
      ) {
        submit = 1;
      }
    });

    console.log('req:', employeeProfileForm);
    if (submit === 0) {
      const formData = new FormData();
      for (const key in employeeProfileForm) {
        const element = employeeProfileForm[key];
        formData.append([key], element);
        console.log([key]);
      }

      try {
        console.log('xios');
        const upload = await axios.post(
          'http://localhost:3000/kycDetails',
          formData,
          { withCredentials: true }
        );
        console.log(upload.data.status, upload.data.status === 401, 'upload');
        setEmployeeProfile({
          ...employeeProfile,
          fname: '',
          lname: '',
          fathername: '',
          email: '',
          dob: '',
          mobile: '',
          address: '',
          address2: '',
          zip: '',
          companyName: '',
          designation: '',
          currentCompanyExperience: '',
          totalExperience: '',
          monthlyIncome: '',
          annualIncome: '',
          adhaarNo: '',
          panNo: '',
          bankName: '',
          accountNo: '',
          IFSCcode: '',
          loanAmount: '',
          emi: '',
        });
        setPan('');
        setAdhaar('');
        setBankStmt('');
        setPhoto('');
        setLoanPurpose('');
        setLoanAmount('');
        setProfession('');
        if (upload.data.status === 401) {
          window.alert(upload.data.message);
        } else if (upload.data.status === 200) {
          modelRef.current.click();
          setMessage(upload.data.message);
        }
      } catch (err) {
        console.log('err', err);
      }
    } else {
      toastr.success('please fill all the field carefully');
    }
  };

  return (
    <>
      <div className="form-padding">
        <div className="row my-3">
          <div className="form-group col-md-4">
            <Select
              placeholder="Purpose Of Loan"
              id="loanPurpose"
              name="loanPurpose"
              options={LoanPurpose}
              onChange={LoanPurposeHandler}
              className="form-control"
            />
          </div>
          <div className="form-group col-md-4">
            <Select
              placeholder="Profession"
              id="profession"
              name="professrion"
              options={Profession}
              onChange={ProfessionHandler}
              className="form-control"
            />
          </div>
          <div className="form-group col-md-4">
            <Select
              placeholder="Loan Amount"
              id="loanAmount"
              name="loanAmount"
              options={LoanAmount}
              onChange={LoanAmountHandler}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <div className="col-12 m-auto">
            <form action="" id="registration" encType="multipart/form-data">
              <nav className="recent-sales-box-nav">
                <div
                  className="nav nav-pills nav-fill"
                  id="nav-tab"
                  role="tablist"
                >
                  <Link
                    className="nav-link active recent-nav-tab"
                    id="step1-tab"
                    data-bs-toggle="tab"
                    to="#step1"
                    ref={BasicDetails}
                  >
                    Basic Information
                  </Link>
                  <Link
                    className="nav-link recent-nav-tab"
                    id="step2-tab"
                    data-bs-toggle="tab"
                    to="#step2"
                    ref={EmployeeDatails}
                  >
                    Employement Details
                  </Link>
                  <Link
                    className="nav-link recent-nav-tab"
                    id="step3-tab"
                    data-bs-toggle="tab"
                    to="#step3"
                    ref={KYCDetails}
                  >
                    KYC Details
                  </Link>
                </div>
              </nav>

              <div className="tab-content py-4">
                <div className="tab-pane fade show active" id="step1">
                  <div className="form-1">
                    <div className="form-row row my-3">
                      <div className="form-group col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="fname"
                          name="fname"
                          value={employeeProfile.fname}
                          onChange={ProfileChangeHandler}
                          placeholder=" First Name"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="lname"
                          name="lname"
                          value={employeeProfile.lname}
                          onChange={ProfileChangeHandler}
                          placeholder=" Last Name"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="fathername"
                          name="fathername"
                          value={employeeProfile.fathername}
                          onChange={ProfileChangeHandler}
                          placeholder="Fathers Name"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>
                    <div className="form-row my-3 row">
                      <div className="form-group col-md-4">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={employeeProfile.email}
                          onChange={ProfileChangeHandler}
                          placeholder="Email"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <input
                          type="date"
                          className="form-control"
                          id="dob"
                          name="dob"
                          value={employeeProfile.dob}
                          onChange={ProfileChangeHandler}
                          placeholder="Date Of Birth"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="mobile"
                          name="mobile"
                          value={employeeProfile.mobile}
                          onChange={ProfileChangeHandler}
                          placeholder="mobile Number"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>
                    <div className="form-group my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={employeeProfile.address}
                        onChange={ProfileChangeHandler}
                        placeholder="1234 Main Street aligarh"
                        disabled={validateSelectOptions()}
                      />
                    </div>
                    <div className="form-group my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        name="address2"
                        value={employeeProfile.address2}
                        onChange={ProfileChangeHandler}
                        placeholder="Apartment, studio, or floor"
                        disabled={validateSelectOptions()}
                      />
                    </div>
                    <div className="form-row my-3 row">
                      <div className="form-group col-md-4">
                        <Select
                          placeholder="Selected State"
                          id="state"
                          name="state"
                          onChange={OptionHandler}
                          options={options}
                          className="form-control"
                          isDisabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <Select
                          placeholder="Selected City"
                          id="city"
                          name="city"
                          options={options1}
                          onChange={OptionHandler1}
                          className="form-control"
                          isDisabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label for="inputZip"> ZIP Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          name="zip"
                          value={employeeProfile.zip}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-between my-3">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn form-btn"
                          data-enchanter="next"
                          onClick={ClickEmployeeDetails}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="step2">
                  <div className="form-2">
                    <div className="form-row row my-3">
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="companyName"
                          name="companyName"
                          placeholder="Current company name"
                          value={employeeProfile.companyName}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="designination"
                          name="designation"
                          placeholder="Post/Designination"
                          value={employeeProfile.designation}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>
                    <div className="form-row my-3 row">
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="currentCompanyExperience"
                          name="currentCompanyExperience"
                          placeholder="Current Work Expirience"
                          value={employeeProfile.currentCompanyExperience}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="totalExperience"
                          name="totalExperience"
                          placeholder="Total Work Expirience"
                          value={employeeProfile.totalExperience}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>
                    <div className="row form-row">
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="montlyIncome"
                          name="monthlyIncome"
                          placeholder="Monthly Income"
                          value={employeeProfile.monthlyIncome}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="annualIncome"
                          name="annualIncome"
                          placeholder="Annual Income"
                          value={employeeProfile.annualIncome}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>

                    <div className="row justify-content-between my-3">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn form-btn"
                          onClick={BasicDetailsFunc}
                        >
                          Previous
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn form-btn"
                          onClick={KYCFunc}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="step3">
                  <div className="form-3">
                    <div className="form-row row my-3">
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="adhaarNo"
                          name="adhaarNo"
                          placeholder="Adhar Card number"
                          value={employeeProfile.adhaarNo}
                          onChange={ProfileChangeHandler}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          type="file"
                          name="adhaar"
                          className="file-input"
                          id="adhaar"
                          placeholder="Post/Designination"
                          onChange={AdhaarUpload}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>
                    <div className="form-row row my-3">
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="panNo"
                          name="panNo"
                          value={employeeProfile.panNo}
                          onChange={ProfileChangeHandler}
                          placeholder="PAN-Card number"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          type="file"
                          className="file-input"
                          name="pan"
                          id="pan"
                          onChange={PanUpload}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>
                    <div className="form-row row my-3">
                      <div className="form-group col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="bankName"
                          name="bankName"
                          value={employeeProfile.bankName}
                          onChange={ProfileChangeHandler}
                          placeholder="Bank Name"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="accountNo"
                          name="accountNo"
                          value={employeeProfile.accountNo}
                          onChange={ProfileChangeHandler}
                          placeholder="Account number"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="IFSCcode"
                          name="IFSCcode"
                          value={employeeProfile.IFSCcode}
                          onChange={ProfileChangeHandler}
                          placeholder="IFSC Code"
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>
                    <div className="form-row row my-3">
                      <div className="form-group col-md-6">
                        <label for="adhar">Insert Your Photograph</label>
                        <input
                          type="file"
                          className="file-input"
                          name="photo"
                          id="photo"
                          onChange={PhotoUpload}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="adhar">Last 3 month's Bank Statement</label>
                        <input
                          type="file"
                          className="file-input"
                          name="bankStmt"
                          id="bankStmt"
                          onChange={BankStmtUpload}
                          disabled={validateSelectOptions()}
                        />
                      </div>
                    </div>

                    <div className="form-row my-3 row">
                      <div className="form-group col-md-6">
                        <input
                          type="checkbox"
                          id="HaveLoan"
                          name="HaveLoan"
                          value="1"
                          onChange={changeBox}
                          disabled={validateSelectOptions()}
                        />
                        <label for="vehicle1">already have a Loan</label>
                        <br />
                      </div>
                    </div>
                    {checkBoxStatus ? checkFunc() : ''}
                    <div className="row justify-content-between my-3">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn form-btn"
                          onClick={ClickEmployeeDetails}
                        >
                          Previous
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn form-btn"
                          onClick={SubmitDetails}
                        >
                          Finish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary d-none"
        ref={modelRef}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                status
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{message}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanForm;

// State: undefined
// City: undefined
// ZIP: ""
// DOB: ""

// adhaar: ""
// bankStmt: ""
// pan: ""
// photo: ""
// EMI: ""
