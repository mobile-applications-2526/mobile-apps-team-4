import useGlobalStyles from "@/styles/global";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { FlatList, Modal, Pressable, Text, useColorScheme, View } from "react-native";

interface Props {
  options: {
    value: string | number,
    label: string,
  }[],
  selected?: string | number,
  setSelected: (value: string | number) => void,
  placeholder?: string,
};

const Dropdown = ({ options, selected, setSelected, placeholder = 'Select one' }: Props) => {
  const styles = useGlobalStyles();
  const isAndroid = process.env.EXPO_OS !== 'ios';
  
  const [open, setOpen] = useState(false);

  const handleSelect = (item: string | number) => {
    setSelected(item);
    setOpen(false);
  };

  return (
    <View style={{ marginTop: 4 }}>

      <Pressable style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}>
          {selected || placeholder}
        </Text>
      </Pressable>

      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setOpen(false)}
        >
          
          <BlurView style={{ borderRadius: 12, overflow: "hidden", width: 250 }} intensity={100}>
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item, index }) => (
                <Pressable
                  style={[
                    { padding: 12, borderColor: styles.borderColor.borderColor },
                    index + 1 !== options.length && { borderBottomWidth: 1 },
                    isAndroid && { backgroundColor: styles.container.backgroundColor },
                  ]}
                  onPress={() => handleSelect(item.value)}
                >

                  <Text style={{ color: styles.text.color, fontSize: 16 }}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </BlurView>

        </Pressable>
      </Modal>

    </View>
  );
};

export default Dropdown;