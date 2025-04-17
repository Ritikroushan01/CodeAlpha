const songs = [
    { title: 'Song One', artist: 'Artist A', category: 'Pop', url: '/music/song1.mp3' },
    { title: 'Song Two', artist: 'Artist B', category: 'Rock', url: '/music/song2.mp3' },
    { title: 'Song Three', artist: 'Artist C', category: 'Jazz', url: '/music/song3.mp3' }
  ];
  
  let currentIndex = 0;
  let isPlaying = false;
  
  const searchInput = document.getElementById('searchInput');
  const songTitle = document.getElementById('songTitle');
  const songInfo = document.getElementById('songInfo');
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const skipBtn = document.getElementById('skipBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const playlist = document.getElementById('playlist');
  
  function renderPlaylist(filtered) {
    playlist.innerHTML = '';
    filtered.forEach((song, index) => {
      const songCard = document.createElement('div');
      songCard.className = 'song-card';
      songCard.innerHTML = `<strong>${song.title}</strong><br /><small>${song.artist} - ${song.category}</small>`;
      songCard.onclick = () => {
        currentIndex = index;
        loadSong(filtered);
      };
      playlist.appendChild(songCard);
    });
  }
  
  function loadSong(songList) {
    const currentSong = songList[currentIndex];
    songTitle.textContent = currentSong.title;
    songInfo.textContent = `${currentSong.artist} - ${currentSong.category}`;
    audioPlayer.src = currentSong.url;
    audioPlayer.load();
    playPauseBtn.textContent = '▶️';
    isPlaying = false;
  }
  
  function togglePlay() {
    if (isPlaying) {
      audioPlayer.pause();
      playPauseBtn.textContent = '▶️';
    } else {
      audioPlayer.play();
      playPauseBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
  }
  
  function skipSong(filtered) {
    currentIndex = (currentIndex + 1) % filtered.length;
    loadSong(filtered);
  }
  
  function handleSearch() {
    const term = searchInput.value.toLowerCase();
    return songs.filter(song =>
      song.title.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term) ||
      song.category.toLowerCase().includes(term)
    );
  }
  
  searchInput.addEventListener('input', () => {
    const filtered = handleSearch();
    renderPlaylist(filtered);
    currentIndex = 0;
    loadSong(filtered);
  });
  
  playPauseBtn.addEventListener('click', () => {
    togglePlay();
  });
  
  skipBtn.addEventListener('click', () => {
    const filtered = handleSearch();
    skipSong(filtered);
  });
  
  audioPlayer.addEventListener('ended', () => {
    const filtered = handleSearch();
    skipSong(filtered);
  });
  
  volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
  });
  
  // Initialize
  volumeSlider.value = 1;
  renderPlaylist(songs);
  loadSong(songs);
  