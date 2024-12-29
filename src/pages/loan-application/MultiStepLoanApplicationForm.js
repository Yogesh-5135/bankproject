import React, { useState } from "react";
import LoanApplicationForm from "./LoanApplicationForm";
import DocumentUploadForm from "./DocumentUploadForm";
import CustomerAddress from "./CustomerAddress";
import AccountDetailsForm from "./AccountDetailsForm";
import GuarantorDetailsForm from "./GuarantorDetailsForm";
import DependentInformationForm from "./DependentInformationForm";

const MultiStepLoanApplicationForm = ({ enquiry }) => {
  const [step, setStep] = useState(1);
  const [loanid, setLoanId] = useState(null);
  const [patchenquiry] = useState(enquiry);

  const handleNext = (loanid) => {
    setLoanId(loanid);
    console.log("Proceeding to the next step with loanid:", loanid);
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      {step === 1 && (
        <LoanApplicationForm onNext={handleNext} enquiry={patchenquiry} />
      )}
      {step === 2 && (
        <DocumentUploadForm
          loanid={loanid}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <DependentInformationForm
          loanid={loanid}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <AccountDetailsForm
          loanid={loanid}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 5 && (
        <CustomerAddress
          loanid={loanid}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 6 && (
        <GuarantorDetailsForm
          loanid={loanid}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default MultiStepLoanApplicationForm;
