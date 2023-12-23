import { css } from 'lit';

export default css`
  
  
  .ams-container {
    height: 100%;
    position: relative; 
  }
  
  .ams-container img {
    width: 100%;
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
    z-index: 2
  }
  
  .ams-container .slot-1 {
    left: 17%;
  }

  .ams-container .slot-2 {
    left: 35.5%;
  }

  .ams-container .slot-3 {
    left: 55.7%;
  }
  
  .ams-container .slot-4 {
    left: 75.5%;
  }

  .ams-container .spool-type {
    color: white;
    top: 70%;
    text-align: center;
    padding: 8px;
    font-size: 1em;
    background-color: rgba(0,0,0,0.4);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.4);
    border-radius: 50px;
    pointer-events: none;
    position: absolute;
    z-index: 2
  }
  
  .ams-container .ams-temperature {
    top: 60%;
    left: 50%;
    text-align: center;
    font-size: 1em;
    background-color: rgba(0,0,0,0.2);
    border-radius: 25px;
    pointer-events: none;
    position: absolute;
    z-index: 3
  }
  
.error {
    color: red;
}
  `
