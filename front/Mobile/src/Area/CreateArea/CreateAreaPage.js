import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './CreateAreaPageStyle';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CreateAreaPage() {
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedReaction, setSelectedReaction] = useState('');
  const [area, setArea] = useState({
      area_title: "",
      area_description: "",
      action_name: "",
      action_description: "",
      action_type: "",
      action_platform: "",
      reaction_name: "",
      reaction_description: "",
      reaction_type: "",
      reaction_platform: "",
  });
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.selectedAction) {
      const { action, platform, actionKey } = route.params.selectedAction;
      setSelectedAction(action);
      setArea(prevArea => ({
        ...prevArea,
        action_name: action,
        action_type: actionKey,
        action_platform: platform,
      }));
    }
    if (route.params?.selectedReaction) {
      const { reaction, platform, reactionKey } = route.params.selectedReaction;
      setSelectedReaction(reaction);
      setArea(prevArea => ({
        ...prevArea,
        reaction_name: reaction,
        reaction_type: reactionKey,
        reaction_platform: platform,
      }));
    }
  }, [route.params]);

  const handleCreateArea = () => {
    navigation.navigate('ChooseAreaName', { area });
  };

  return (
    <View style={styles.globalContainer}>
      <View style={styles.pageContainer}>
        <View style={styles.areaContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ChooseAction')}>
            <Text style={styles.textButton}>
              {selectedAction || "Select Action"}
            </Text>
          </TouchableOpacity>
          <Image source={require('../../../assets/arrow.png')} style={styles.arrowImage} />
          <TouchableOpacity onPress={() => navigation.navigate('ChooseReaction')}>
            <Text style={styles.textButton}>
              {selectedReaction || "Select Reaction"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.createArea} onPress={handleCreateArea}>
          <Text style={styles.textButton}>Create A-Rea</Text>
        </TouchableOpacity>
      </View>
      <NavigationBar />
    </View>
  );
}
