import React from "react";

export default function ZipCodeEntry() {
  return (
    <div>
      <form>
        <label className="required" htmlFor="zipCode">
          Zip Code
        </label>
        <input type="text" name="zipCode" placeholder="29412" required />
      </form>
    </div>
  );
}
