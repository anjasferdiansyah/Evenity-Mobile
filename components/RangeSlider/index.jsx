import React, { useCallback, useState } from "react";
import RangeSliderRN from "rn-range-slider";
import { View, Text } from "react-native";

import Label from "./Label";
import Notch from "./Notch";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Thumb from "./Thumb";

const RangeSlider = ({ from = 0, to = 10000, onValueChange }) => {
  const [low, setLow] = useState(from);
  const [high, setHigh] = useState(to);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback(
    (newLow, newHigh) => {
      setLow(newLow);
      setHigh(newHigh);
      if (onValueChange) {
        onValueChange(newLow, newHigh); // Pass values to parent
      }
    },
    [onValueChange]
  );

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10
        }}
      >
        <View>
          <Text
            style={{
              fontStyle: "italic",
              textAlign: "left",
              fontSize: 14,
              color: "#D2D2D2"
            }}
          >
            Min
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#000000" }}>
            Rp. {low.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontStyle: "italic",
              textAlign: "right",
              fontSize: 14,
              color: "#D2D2D2"
            }}
          >
            Max
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#000000" }}>
            Rp. {high.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </Text>
        </View>
      </View>
      <RangeSliderRN
        min={from}
        max={to}
        step={100000}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        onValueChanged={handleValueChange} // Update values
      />
    </>
  );
};

export default RangeSlider;
