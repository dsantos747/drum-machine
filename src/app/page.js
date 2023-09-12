"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

function DrumMachine() {
  const [audioFiles] = useState([
    { id: "Q", src: "/kit_1_fx_2.wav" },
    { id: "W", src: "/kit_1_fx_3.wav" },
    { id: "E", src: "/kit_1_fx_4.wav" },
    { id: "A", src: "/kit_1_open_hh.wav" },
    { id: "S", src: "/kit_1_clap.wav" },
    { id: "D", src: "/kit_1_fx_1.wav" },
    { id: "Z", src: "/kit_1_kick.wav" },
    { id: "X", src: "/kit_1_snare.wav" },
    { id: "C", src: "/kit_1_closed_hh.wav" },
  ]);

  // function handlePadClick(id) {
  //   playClip(id);
  // }

  useEffect(() => {
    function handleKeyDown(event) {
      const keyToPad = {
        q: "Q",
        w: "W",
        e: "E",
        a: "A",
        s: "S",
        d: "D",
        z: "Z",
        x: "X",
        c: "C",
      };

      const padId = keyToPad[event.key.toLowerCase()];

      if (padId) {
        playClip(padId);
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function playClip(id) {
    const audioObj = document.getElementById(id);
    if (audioObj) {
      audioObj.play();
      document.getElementById("display-text").textContent = audioObj.getAttribute("name");
    }
  }

  return (
    <main id="drum-machine" className={styles.main}>
      <div className={styles.body}>
        <div id="display" className={styles.display}>
          <p id="display-text"></p>
        </div>
        <div id="pads" className={styles.pads}>
          <div id="heater-2" className="drum-pad" onClick={() => playClip("Q")}>
            <audio name="Heater 2" src="/kit_1_fx_2.wav" className="clip" id="Q"></audio>Q
          </div>
          <div id="heater-3" className="drum-pad" onClick={() => playClip("W")}>
            <audio name="Heater 3" src="/kit_1_fx_3.wav" className="clip" id="W"></audio>W
          </div>
          <div id="heater-4" className="drum-pad" onClick={() => playClip("E")}>
            <audio name="Heater 4" src="/kit_1_fx_4.wav" className="clip" id="E"></audio>E
          </div>
          <div id="open-hh" className="drum-pad" onClick={() => playClip("A")}>
            <audio name="Open Hi-Hat" src="/kit_1_open_hh.wav" className="clip" id="A"></audio>A
          </div>
          <div id="clap" className="drum-pad" onClick={() => playClip("S")}>
            <audio name="Clap" src="/kit_1_clap.wav" className="clip" id="S"></audio>S
          </div>
          <div id="heater-1" className="drum-pad" onClick={() => playClip("D")}>
            <audio name="Heater 1" src="/kit_1_fx_1.wav" className="clip" id="D"></audio>D
          </div>
          <div id="kick" className="drum-pad" onClick={() => playClip("Z")}>
            <audio name="Kick" src="/kit_1_kick.wav" className="clip" id="Z"></audio>Z
          </div>
          <div id="snare" className="drum-pad" onClick={() => playClip("X")}>
            <audio name="Snare" src="/kit_1_snare.wav" className="clip" id="X"></audio>X
          </div>
          <div id="closed-hh" className="drum-pad" onClick={() => playClip("C")}>
            <audio name="Closed Hi-Hat" src="/kit_1_closed_hh.wav" className="clip" id="C"></audio>C
          </div>
        </div>
      </div>
    </main>
  );
}

export default DrumMachine;
