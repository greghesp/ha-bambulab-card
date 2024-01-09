import { css } from "lit";

export default css`
  .ams-container {
    height: 100%;
    position: relative;
  }

  .ams-tabs {
    background: #e3e1e1;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: center;
    gap: 5px;
  }

  .ams-tabs .spool {
    height: 15px;
    background: white;
    border-radius: 2px;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    overflow: hidden;
    width: 15px;
  }

  .vector {
    background: #e3e1e1;
    border-radius: 10px;
  }

  .selector {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    align-content: center;
    gap: 10px;
    padding: 10px 0;
  }

  .vector .spools {
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: center;
    padding: 25px 0;
    height: 120px;
  }

  .vector .spool {
    width: 18%;
    height: 100%;
    background: white;
    border-radius: 5px;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    overflow: hidden;
  }
  .spool .overlay {
    z-index: 2;
    background: red;
    height: 50%;
  }

  .ams-container img {
    width: 100%;
  }

  .ams-container .humidity {
    top: 35%;
    text-align: center;
    font-size: 1em;
    background-color: rgba(0, 0, 0);
    border-radius: 50px;
    padding: 8px;
    pointer-events: none;
    position: absolute;
    z-index: 2;
    left: 90%;
    width: 30px;
  }

  .ams-container .spool-badge {
    top: 20%;
    text-align: center;
    font-size: 1em;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50px;
    padding: 8px;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }

  .slot-1 {
    left: 17%;
  }

  .slot-2 {
    left: 35.5%;
  }

  .slot-3 {
    left: 55.7%;
  }

  .slot-4 {
    left: 75.5%;
  }

  .ams-container .spool-type {
    color: white;
    top: 60%;
    text-align: center;
    padding: 8px;
    font-size: 1em;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.4);
    border-radius: 50px;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }

  .ams-container .ams-temperature {
    top: 60%;
    left: 50%;
    text-align: center;
    font-size: 1em;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 25px;
    pointer-events: none;
    position: absolute;
    z-index: 3;
  }

  .error {
    color: red;
  }
`;
