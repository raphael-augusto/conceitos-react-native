import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
       setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    const repositoryLikes = response.data

    const repositoriesUp = repositories.map(repository => {
      if (repository.id === id) {
        return repositoryLikes;
      } else {
        return repository;
      }
    });
  
    const repository = repositoriesUp;

  setRepositories(repository); 
  }

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
    <SafeAreaView style={styles.container}>
    
      <FlatList 
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={({ item }) => (
          <>
            <Text style={styles.repository}>{item.title}</Text>

            <Text style={styles.tech}>ReactJS</Text>
            <Text style={styles.tech}>Node.js</Text>
            <Text
            style={styles.likeText}
            testID={`repository-likes-${item.id}`}
            >
              {item.likes < 2
                    ? `${item.likes} curtida`
                    : `${item.likes} curtidas`}
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.button}
              onPress={() => handleLikeRepository(item.id)}
              testID={`like-button-${item.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity> 
          </>
        )}
      />	 
    </SafeAreaView>
  </>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
