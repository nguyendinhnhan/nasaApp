import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingTop: 20,
    paddingHorizontal: 25
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#7864AE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  text: {
    marginLeft: 10,
    color: '#FFF',
    fontSize: 18
  },
  noResult: {
    flex: 2,
    fontSize: 20,
    color: '#484848',
    textAlign: 'center',
    marginTop: 100
  }
});

export default styles;
