"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";

// Howler.ctx.resume();
Howler.volume(1.0);
Howler.autoSuspend = false;

function DrumMachine() {
  // const [audioFiles, setAudioFiles] = useState(selectBank());
  const [audioFiles, setAudioFiles] = useState(null);
  // const [audioFiles, setAudioFiles] = useState([
  //   { id: "Q", src: "/kit_1_fx_2.wav" },
  //   { id: "W", src: "/kit_1_fx_3.wav" },
  //   { id: "E", src: "/kit_1_fx_4.wav" },
  //   { id: "A", src: "/kit_1_open_hh.wav" },
  //   { id: "S", src: "/kit_1_clap.wav" },
  //   { id: "D", src: "/kit_1_fx_1.wav" },
  //   { id: "Z", src: "/kit_1_kick.wav" },
  //   { id: "X", src: "/kit_1_snare.wav" },
  //   { id: "C", src: "/kit_1_closed_hh.wav" },
  // ]);

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

  const sound = new Howl({ src: ["/kit_1_fx_2.wav"] });

  useEffect(() => {
    selectBank();

    function handleKeyDown(event) {
      const keyToPad = {
        q: 1,
        w: 2,
        e: 3,
        a: 4,
        s: 5,
        d: 6,
        z: 7,
        x: 8,
        c: 9,
      };

      const padId = keyToPad[event.key.toLowerCase()];

      if (padId) {
        playClip(padId - 1, event.key.toUpperCase());
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function playClip(id, pad_id) {
    audioFiles[id]["src"].play();
    document.getElementById("display-text").textContent = document.getElementById(pad_id).getAttribute("name");
  }

  return (
    <main id="drum-machine" className={styles.main}>
      <div className="banner">
        <p className="bannerText">
          Use letter keys to trigger pads.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Product under
          development.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;If you want more features, check back soon.
        </p>
      </div>
      <div className="body">
        <div id="display" className="display">
          <p id="display-text"></p>
        </div>
        <div id="pads" className={styles.pads}>
          <div id="heater-2" className="drumPad" onClick={() => playClip(0, "Q")}>
            <audio name="Heater 2" src="/kit_1_fx_2.wav" className="clip" id="Q"></audio>
            <p className="padLetter">Q</p>
            <p className="padNumber">1</p>
          </div>
          <div id="heater-3" className="drumPad" onClick={() => playClip(1, "W")}>
            <audio name="Heater 3" src="/kit_1_fx_3.wav" className="clip" id="W"></audio>
            <p className="padLetter">W</p>
            <p className="padNumber">2</p>
          </div>
          <div id="heater-4" className="drumPad" onClick={() => playClip(2, "E")}>
            <audio name="Heater 4" src="/kit_1_fx_4.wav" className="clip" id="E"></audio>
            <p className="padLetter">E</p>
            <p className="padNumber">3</p>
          </div>
          <div id="open-hh" className="drumPad" onClick={() => playClip(3, "A")}>
            <audio name="Open Hi-Hat" src="/kit_1_open_hh.wav" className="clip" id="A"></audio>
            <p className="padLetter">A</p>
            <p className="padNumber">4</p>
          </div>
          <div id="clap" className="drumPad" onClick={() => playClip(4, "S")}>
            <audio name="Clap" src="/kit_1_clap.wav" className="clip" id="S"></audio>
            <p className="padLetter">S</p>
            <p className="padNumber">5</p>
          </div>
          <div id="heater-1" className="drumPad" onClick={() => playClip(5, "D")}>
            <audio name="Heater 1" src="/kit_1_fx_1.wav" className="clip" id="D"></audio>
            <p className="padLetter">D</p>
            <p className="padNumber">6</p>
          </div>
          <div id="kick" className="drumPad" onClick={() => playClip(6, "Z")}>
            <audio name="Kick" src="/kit_1_kick.wav" className="clip" id="Z"></audio>
            <p className="padLetter">Z</p>
            <p className="padNumber">7</p>
          </div>
          <div id="snare" className="drumPad" onClick={() => playClip(7, "X")}>
            <audio name="Snare" src="/kit_1_snare.wav" className="clip" id="X"></audio>
            <p className="padLetter">X</p>
            <p className="padNumber">8</p>
          </div>
          <div id="closed-hh" className="drumPad" onClick={() => playClip(8, "C")}>
            <audio name="Closed Hi-Hat" src="/kit_1_closed_hh.wav" className="clip" id="C"></audio>
            <p className="padLetter">C</p>
            <p className="padNumber">9</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DrumMachine;
