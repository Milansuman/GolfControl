import {useRef} from "react";
import { StyleSheet, View, Animated, PanResponder } from "react-native";

export default function Joystick({maxX=15, maxY=15, baseSize=100, stickSize=60, baseColor="#efefef", stickColor="#acacac", onMove=(x,y)=>{}}){
    const styles = StyleSheet.create({
        pad: {
            width: baseSize,
            height: baseSize,
            backgroundColor: baseColor,
            borderRadius: baseSize,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        stick: {
            width: stickSize,
            height: stickSize,
            backgroundColor: stickColor,
            borderRadius: stickSize,
            margin: "auto"
        }
    })

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (ev, gestureState) => {
            onMove(Math.max(Math.min(gestureState.dx, maxX), -maxX), -Math.max(Math.min(gestureState.dy, maxY), -maxY))
            Animated.event([null, {
                dx: pan.x,
                dy: pan.y
            }], {
                useNativeDriver: false
            })(ev, gestureState)
        },
        onPanResponderRelease: () => {
            Animated.spring(pan, {
                toValue: {
                    x: 0,
                    y: 0
                },
                useNativeDriver: false
            }).start()
        }
    })).current

    return <View style={[styles.pad]}>
        <Animated.View style={[{
            transform: pan.getTranslateTransform()
        }, styles.stick]} {...panResponder.panHandlers}>
        </Animated.View>
    </View>
}

