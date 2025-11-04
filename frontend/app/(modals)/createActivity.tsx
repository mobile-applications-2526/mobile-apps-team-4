import Button from "@/components/inputs/Button";
import ColorSelector from "@/components/inputs/ColorSelector";
import Dropdown from "@/components/inputs/Dropdown";
import IconSelector from "@/components/inputs/IconSelector";
import LocationPicker from "@/components/inputs/LocationPicker";
import PickerDateTime from "@/components/inputs/PickerDateTime";
import ModalHeading from "@/components/ui/ModalHeading";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import ActivityService from "@/services/ActivityService";
import GroupService from "@/services/GroupService";
import useGlobalStyles from "@/styles/global";
import { Activity, Group } from "@/types";
import showErrorToast from "@/utils/showErrorToast";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const CreateActivity = () => {
  const { user } = useAuth();
  const styles = useGlobalStyles();

  const [ownedGroups, setOwnedGroups] = useState<Group[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<Activity['icon'] | undefined>(undefined);
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<Activity['location'] | undefined>(undefined);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await GroupService.getJoined();

        setOwnedGroups(res?.filter(g => g.owner.id === user?.id));
      } catch (err) {
        showErrorToast(err);
      }
    };

    fetchGroups();
  }, [])

  const handleCreateActivity = async () => {
    try {
      if (!selectedGroup) {
        setError('Group must be selected');
        return;
      }
      if (!name) {
        setError('Activity must have a name');
        return;
      }
      if (!location) {
        setError('Activity must have a location');
        return;
      }
      if (!icon) {
        setError('Activity must have an icon');
        return;
      }
      if (!startDate) {
        setError('Activity must have a startdate');
        return;
      }
      if (!endDate) {
        setError('Activity must have an endDate');
        return;
      }

      setError(undefined);

      await ActivityService.create({
        name,
        group: selectedGroup.id,
        location,
        icon: {
          iconColor: icon.color.replace('#', 'HEX_'),
          iconSymbolName: icon.name.replace('.', '_'),
        },
        startDate: startDate.toISOString(),
        ...(endDate && {endDate: endDate?.toISOString()}),
      });

      router.replace('/(app)'); // so app refreshes and shows new activity

      Toast.show({
        type: 'success',
        text1: 'Activity created',
      });
    } catch (err) {
      router.back();
      showErrorToast(err);
    }
  };

  if (ownedGroups && ownedGroups.length === 0) {
    router.back();
    Toast.show({
      type: 'error',
      text1: 'You own no groups',
      text2: 'Please create a group before adding activities.',
    });
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView

      >

        <ModalHeading name="Create a new activity" />

        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          autoCapitalize="sentences"
          placeholder='Name'
          placeholderTextColor={styles.placeholderText.color}
          returnKeyType="done"
          style={styles.input}
        />

        <Text style={styles.label}>Choose a group for the activity</Text>
        {ownedGroups ? (
          <Dropdown
            options={ownedGroups?.map(g => ({ value: g.id, label: g.name}) )}
            setSelected={value => setSelectedGroup(ownedGroups.find(g => g.id === Number(value)))}
            selected={selectedGroup?.name}
            placeholder="Select a group"
          />
        ) : (
          <ActivityIndicator style={styles.containerCenter} />
        )}

        <Text style={styles.label}>Select a location</Text>
        <LocationPicker setLocation={loc => setLocation(loc)} />

        <Text style={styles.label}>Choose an icon</Text>
        <IconSelector
          color={icon?.color || Colors.light.tint}
          setIcon={i => setIcon({ name: i, color: icon?.color || Colors.light.tint })}
          selectedIcon={icon?.name || undefined}
        />

        <Text style={styles.label}>Choose a color</Text>
        <ColorSelector
          color={icon?.color}
          setColor={c => setIcon({ name: icon?.name || 'figure.walk', color: c })}
        />

        <Text style={styles.label}>Choose a start date and time</Text>
        <PickerDateTime date={startDate} setDate={d => setStartDate(d)} />

        <Text style={styles.label}>Choose an end date and time (optional)</Text>
        <PickerDateTime date={endDate} setDate={d => setEndDate(d)} />

        {error ? <Text style={{ color: 'red', paddingBottom: 8 }}>{error}</Text> : null}

        <Button
          label="Create activity"
          onPress={handleCreateActivity}
        />

      </ScrollView>

    </SafeAreaView>
  );
};

export default CreateActivity;