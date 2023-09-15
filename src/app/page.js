"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";

Howler.volume(1.0);
Howler.autoSuspend = false;

// Initialise AudioContext engine.
function startMachine() {
  Howler.ctx.resume();
  const elements = Array.from(document.getElementsByClassName("inactive"));
  elements.forEach((element) => {
    element.classList.remove("inactive");
  });
}

function DrumMachine() {
  const [audioFiles, setAudioFiles] = useState([
    { id: "Q", src: new Howl({ src: ["/kit_1_fx_2.wav"] }) },
    { id: "W", src: new Howl({ src: ["/kit_1_fx_3.wav"] }) },
    { id: "E", src: new Howl({ src: ["/kit_1_fx_4.wav"] }) },
    { id: "A", src: new Howl({ src: ["/kit_1_open_hh.wav"] }) },
    { id: "S", src: new Howl({ src: ["/kit_1_clap.wav"] }) },
    { id: "D", src: new Howl({ src: ["/kit_1_fx_1.wav"] }) },
    { id: "Z", src: new Howl({ src: ["/kit_1_kick.wav"] }) },
    { id: "X", src: new Howl({ src: ["/kit_1_snare.wav"] }) },
    { id: "C", src: new Howl({ src: ["/kit_1_closed_hh.wav"] }) },
  ]);
  const [activeSounds, setActiveSounds] = useState({});

  // Bank selector - add more sound bank links here
  const selectBank = (bank) => {
    switch (bank) {
      case "bank-2":
        break;
      default:
        setAudioFiles([
          { id: "Q", src: new Howl({ src: ["/kit_1_fx_2.wav"] }) },
          { id: "W", src: new Howl({ src: ["/kit_1_fx_3.wav"] }) },
          { id: "E", src: new Howl({ src: ["/kit_1_fx_4.wav"] }) },
          { id: "A", src: new Howl({ src: ["/kit_1_open_hh.wav"] }) },
          { id: "S", src: new Howl({ src: ["/kit_1_clap.wav"] }) },
          { id: "D", src: new Howl({ src: ["/kit_1_fx_1.wav"] }) },
          { id: "Z", src: new Howl({ src: ["/kit_1_kick.wav"] }) },
          { id: "X", src: new Howl({ src: ["/kit_1_snare.wav"] }) },
          { id: "C", src: new Howl({ src: ["/kit_1_closed_hh.wav"] }) },
        ]);
    }
  };

  const keyToPad = { "Q": 0, "W": 1, "E": 2, "A": 3, "S": 4, "D": 5, "Z": 6, "X": 7, "C": 8 };

  useEffect(() => {
    function handleKeyDown(event) {
      if (keyToPad.hasOwnProperty(event.key.toUpperCase())) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        playClip(event.key.toUpperCase());
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyToPad]);

  function playClip(padLetter) {
    if (keyToPad.hasOwnProperty(padLetter)) {
      const index = keyToPad[padLetter];
      audioFiles[index]["src"].play();
      setActiveSounds({ ...activeSounds, [padLetter]: index });
      document.getElementById("display-text").textContent = document.getElementById(padLetter).getAttribute("name");
    }
  }

  function stopClip(padLetter) {
    const soundId = activeSounds[padLetter];
    if (soundId !== undefined) {
      const sound = audioFiles[soundId]["src"];
      sound.stop(soundId);
      setActiveSounds((prevActiveSounds) => {
        const newActiveSounds = { ...prevActiveSounds };
        delete newActiveSounds[padLetter];
        return newActiveSounds;
      });
    }
  }

  return (
    <main id="drum-machine" className={styles.main}>
      <div className="banner">
        <p className="bannerText">
          Use letter keys to trigger pads.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Product under
          development.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;If you want more features, check back soon.
        </p>
      </div>
      <div>
        <div className="startButton" onClick={() => startMachine()}>
          Let's play!
        </div>
        <div className="drumMachineBody inactive">
          <div id="display" className="display">
            <p id="display-text"></p>
          </div>
          <div id="pads" className={styles.pads}>
            <div id="heater-2" className="drumPad inactive" onMouseDown={() => playClip("Q")} onMouseUp={() => stopClip("Q")}>
              <audio name="Heater 2" src="/kit_1_fx_2.wav" className="clip" id="Q"></audio>
              <p className="padLetter">Q</p>
              <p className="padNumber">1</p>
            </div>
            <div id="heater-3" className="drumPad inactive" onMouseDown={() => playClip("W")} onMouseUp={() => stopClip("W")}>
              <audio name="Heater 3" src="/kit_1_fx_3.wav" className="clip" id="W"></audio>
              <p className="padLetter">W</p>
              <p className="padNumber">2</p>
            </div>
            <div id="heater-4" className="drumPad inactive" onMouseDown={() => playClip("E")} onMouseUp={() => stopClip("E")}>
              <audio name="Heater 4" src="/kit_1_fx_4.wav" className="clip" id="E"></audio>
              <p className="padLetter">E</p>
              <p className="padNumber">3</p>
            </div>
            <div id="open-hh" className="drumPad inactive" onMouseDown={() => playClip("A")} onMouseUp={() => stopClip("A")}>
              <audio name="Open Hi-Hat" src="/kit_1_open_hh.wav" className="clip" id="A"></audio>
              <p className="padLetter">A</p>
              <p className="padNumber">4</p>
            </div>
            <div id="clap" className="drumPad inactive" onMouseDown={() => playClip("S")} onMouseUp={() => stopClip("S")}>
              <audio name="Clap" src="/kit_1_clap.wav" className="clip" id="S"></audio>
              <p className="padLetter">S</p>
              <p className="padNumber">5</p>
            </div>
            <div id="heater-1" className="drumPad inactive" onMouseDown={() => playClip("D")} onMouseUp={() => stopClip("D")}>
              <audio name="Heater 1" src="/kit_1_fx_1.wav" className="clip" id="D"></audio>
              <p className="padLetter">D</p>
              <p className="padNumber">6</p>
            </div>
            <div id="kick" className="drumPad inactive" onMouseDown={() => playClip("Z")} onMouseUp={() => stopClip("Z")}>
              <audio name="Kick" src="/kit_1_kick.wav" className="clip" id="Z"></audio>
              <p className="padLetter">Z</p>
              <p className="padNumber">7</p>
            </div>
            <div id="snare" className="drumPad inactive" onMouseDown={() => playClip("X")} onMouseUp={() => stopClip("X")}>
              <audio name="Snare" src="/kit_1_snare.wav" className="clip" id="X"></audio>
              <p className="padLetter">X</p>
              <p className="padNumber">8</p>
            </div>
            <div id="closed-hh" className="drumPad inactive" onMouseDown={() => playClip("C")} onMouseUp={() => stopClip("C")}>
              <audio name="Closed Hi-Hat" src="/kit_1_closed_hh.wav" className="clip" id="C"></audio>
              <p className="padLetter">C</p>
              <p className="padNumber">9</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DrumMachine;
