this.state = {
    documentData: [],
    limit: 9,
    lastVisible: null,
    loading: false,
    refreshing: false,
};


// Component Did Mount
componentDidMount = () => {
    try {
        // Cloud Firestore: Initial Query
        this.retrieveData();
    }
    catch (error) {
        console.log(error);
    }
};

// Retrieve Data
retrieveData = async () => {
    try {
        // Set State: Loading
        this.setState({
            loading: true,
        });
        console.log('Retrieving Data');

        // Cloud Firestore: Query
        let initialQuery = await database.collection('users')
            .where('id', '<=', 20)
            .orderBy('id')
            .limit(this.state.limit)

        // Cloud Firestore: Query Snapshot
        let documentSnapshots = await initialQuery.get();

        // Cloud Firestore: Document Data
        let documentData = documentSnapshots.docs.map(document => document.data());

        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        let lastVisible = documentData[documentData.length - 1].id;

        // Set State
        this.setState({
            documentData: documentData,
            lastVisible: lastVisible,
            loading: false,
        });
    }
    catch (error) {
        console.log(error);
    }
};

// Retrieve More
retrieveMore = async () => {
    try {
        // Set State: Refreshing
        this.setState({
            refreshing: true,
        });
        console.log('Retrieving additional Data');

        // Cloud Firestore: Query (Additional Query)
        let additionalQuery = await database.collection('users')
            .where('id', '<=', 20)
            .orderBy('id')
            .startAfter(this.state.lastVisible)
            .limit(this.state.limit)

        let documentSnapshots = await additionalQuery.get();

        let documentData = documentSnapshots.docs.map(document => document.data());

        let lastVisible = documentData[documentData.length - 1].id;

        // Set State
        this.setState({
            documentData: [...this.state.documentData, ...documentData],
            lastVisible: lastVisible,
            refreshing: false,
        });
    }
    catch (error) {
        console.log(error);
    }
};