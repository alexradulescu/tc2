import React, { useState } from "react";

function calculateTax(income: number): number {
  if (income <= 20000) {
    return 0;
  } else if (income <= 30000) {
    return 200 + (income - 20000) * 0.02;
  } else if (income <= 40000) {
    return 350 + (income - 30000) * 0.035;
  } else if (income <= 80000) {
    return 550 + (income - 40000) * 0.07;
  } else if (income <= 120000) {
    return 3350 + (income - 80000) * 0.115;
  } else if (income <= 160000) {
    return 7950 + (income - 120000) * 0.15;
  } else if (income <= 200000) {
    return 13950 + (income - 160000) * 0.18;
  } else if (income <= 240000) {
    return 21150 + (income - 200000) * 0.19;
  } else if (income <= 280000) {
    return 28750 + (income - 240000) * 0.195;
  } else if (income <= 320000) {
    return 36550 + (income - 280000) * 0.2;
  } else if (income <= 500000) {
    return 44550 + (income - 320000) * 0.22;
  } else if (income <= 1000000) {
    return 84150 + (income - 500000) * 0.23;
  } else {
    return 199150 + (income - 1000000) * 0.24;
  }
}

interface SalaryInputProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
}

const SalaryInput: React.FC<SalaryInputProps> = ({
  label,
  value,
  onChange,
}) => (
  <div>
    <label>{label}</label>
    <br />
    <input
      type="search"
      className="form-control"
      pattern="[0-9]*"
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
    />
  </div>
);

const TaxCalculator: React.FC = () => {
  const [monthlySalary1, setMonthlySalary1] = useState<number | undefined>(
    undefined,
  );
  const [monthlySalary2, setMonthlySalary2] = useState<number | undefined>(
    undefined,
  );
  const [annualSalary1, setAnnualSalary1] = useState<number | undefined>(
    undefined,
  );
  const [annualSalary2, setAnnualSalary2] = useState<number | undefined>(
    undefined,
  );
  const [bonus1, setBonus1] = useState<number | undefined>(undefined);
  const [bonus2, setBonus2] = useState<number | undefined>(undefined);

  const calcEffectiveRate = (income: number, tax: number): string => {
    return ((tax / income) * 100).toFixed(2) + "%";
  };

  const calculateResults = () => {
    const salary1 = annualSalary1 ?? monthlySalary1! * 12 + (bonus1 ?? 0);
    const salary2 = annualSalary2 ?? monthlySalary2! * 12 + (bonus2 ?? 0);

    const tax1 = calculateTax(salary1);
    const tax2 = calculateTax(salary2);

    return {
      salary1,
      salary2,
      tax1,
      tax2,
      monthlySave1: tax1 / 12,
      monthlySave2: tax2 / 12,
      net1: monthlySalary1
        ? monthlySalary1 - tax1 / 12
        : annualSalary1! / 12 - tax1,
      net2: monthlySalary2
        ? monthlySalary2 - tax2 / 12
        : annualSalary2! / 12 - tax2,
      effectiveRate1: calcEffectiveRate(salary1, tax1),
      effectiveRate2: calcEffectiveRate(salary2, tax2),
    };
  };

  const results = calculateResults();

  return (
    <form>
      <h1>Tax Calculator</h1>
      <button type="reset">Reset Salaries</button>
      <aside>
        <div>
          <h2>Person 1</h2>
          <SalaryInput
            label="Monthly Salary"
            value={monthlySalary1}
            onChange={(value) => setMonthlySalary1(value)}
          />
          <SalaryInput
            label="Annual Salary"
            value={annualSalary1}
            onChange={(value) => setAnnualSalary1(value)}
          />
          <SalaryInput
            label="Bonus"
            value={bonus1}
            onChange={(value) => setBonus1(value)}
          />
          <hr />
          <h2>Person 2</h2>
          <SalaryInput
            label="Monthly Salary"
            value={monthlySalary2}
            onChange={(value) => setMonthlySalary2(value)}
          />
          <SalaryInput
            label="Annual Salary"
            value={annualSalary2}
            onChange={(value) => setAnnualSalary2(value)}
          />
          <SalaryInput
            label="Bonus"
            value={bonus2}
            onChange={(value) => setBonus2(value)}
          />
        </div>
        <div>
          <h2>Results</h2>
          {monthlySalary1 || annualSalary1 ? (
            <>
              <p>Person 1 Annual Tax: ${results.tax1.toFixed(2)}</p>
              <p>
                Person 1 Monthly Save for Tax: $
                {results.monthlySave1.toFixed(2)}
              </p>
              <p>Person 1 Net Salary: ${results.net1.toFixed(2)}</p>
              <p>Person 1 Effective Tax Rate: {results.effectiveRate1}</p>
              <hr />
            </>
          ) : null}
          {monthlySalary2 || annualSalary2 ? (
            <>
              <hr />
              <p>Person 2 Annual Tax: ${results.tax2.toFixed(2)}</p>
              <p>
                Person 2 Monthly Save for Tax: $
                {results.monthlySave2.toFixed(2)}
              </p>
              <p>Person 2 Net Salary: ${results.net2.toFixed(2)}</p>
              <p>Person 2 Effective Tax Rate: {results.effectiveRate2}</p>
              <hr />
            </>
          ) : null}
          {results.tax1 || results.tax2 ? (
            <>
              <h3>Totals for Both Persons</h3>
              <p>
                Total Annual Tax: ${(results.tax1 + results.tax2).toFixed(2)}
              </p>
              <p>
                Total Monthly Save for Tax: $
                {(results.monthlySave1 + results.monthlySave2).toFixed(2)}
              </p>
              <p>
                Total Net Salary: ${(results.net1 + results.net2).toFixed(2)}
              </p>
            </>
          ) : null}
        </div>
      </aside>
    </form>
  );
};

export default TaxCalculator;
