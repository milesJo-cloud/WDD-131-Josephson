const leon = {
  name:      "Leon S. Kennedy",
  class:     "DSO Agent",
  level:     30,
  health:    100,
  image:     "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400",
  maxHealth: 100,

  attacked() {
    if (this.health <= 0) return;
    this.health = Math.max(0, this.health - 20);
    this.render();
    flash('flashRed');
    if (this.health <= 0) {
      setTimeout(() => alert("Leon S. Kennedy has been killed.\n\n[ MISSION FAILED ]"), 100);
    }
  },

  levelUp() {
    this.level += 1;
    this.render();
    flash('flashGreen');
  },

  render() {
    const pct = this.health / this.maxHealth;

    // Determine health tier
    let tier = 'high';
    if (pct <= 0)        tier = 'dead';
    else if (pct <= 0.3) tier = 'low';
    else if (pct <= 0.6) tier = 'mid';

    document.getElementById('charLevel').textContent = this.level;
    document.getElementById('healthNum').textContent  = `${this.health} / ${this.maxHealth}`;
    document.getElementById('healthFill').style.width = (pct * 100) + '%';

    // Update health color classes
    document.getElementById('healthNum').className  = 'health-num '  + tier;
    document.getElementById('healthFill').className = 'health-fill ' + tier;

    // Status text
    const dead       = this.health <= 0;
    const statusMsg  = document.getElementById('statusMsg');
    const charStatus = document.getElementById('charStatus');

    if (dead) {
      statusMsg.textContent    = '⚠ AGENT DOWN — CRITICAL FAILURE';
      statusMsg.style.display  = 'block';
      charStatus.textContent   = 'KIA';
      charStatus.style.color   = '#c00';
      document.getElementById('btnAttacked').disabled = true;
    } else if (tier === 'low') {
      statusMsg.textContent   = '⚠ CRITICAL CONDITION';
      statusMsg.style.display = 'block';
      charStatus.textContent  = 'Active';
      charStatus.style.color  = '';
    } else {
      statusMsg.style.display = 'none';
      charStatus.textContent  = 'Active';
      charStatus.style.color  = '';
    }
  }
};

function flash(id) {
  const el = document.getElementById(id);
  el.classList.remove('show');
  void el.offsetWidth; // force reflow to restart animation
  el.classList.add('show');
}

// Initialize on page load
leon.render();
