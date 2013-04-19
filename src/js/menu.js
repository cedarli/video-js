/* Menu
================================================================================ */
/**
 * The base for text track and settings menu buttons.
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.Menu = vjs.Component.extend();

vjs.Menu.prototype.addItem = function(component){
  this.addChild(component);
  component.on('click', vjs.bind(this, function(){
    this.unlockShowing();
  }));
};

vjs.Menu.prototype.createEl = function(){
  var contentElType = this.options().contentElType || 'ul';
  this.contentEl_ = vjs.createEl(contentElType, {
    className: 'vjs-menu-content'
  });
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    append: this.contentEl_,
    className: 'vjs-menu'
  });
  el.appendChild(this.contentEl_);
  return el;
};

/**
 * Menu item
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.MenuItem = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    if (options['selected']) {
      this.addClass('vjs-selected');
      this.el_.setAttribute('aria-selected',true);
    } else {
      this.el_.setAttribute('aria-selected',false);
    }
  }
});

vjs.MenuItem.prototype.createEl = function(type, props){
  return vjs.Button.prototype.createEl.call(this, 'li', vjs.obj.merge({
    className: 'vjs-menu-item',
    innerHTML: this.options_['label']
  }, props));
};

vjs.MenuItem.prototype.onClick = function(){
  this.selected(true);
};

vjs.MenuItem.prototype.selected = function(selected){
  if (selected) {
    this.addClass('vjs-selected');
    this.el_.setAttribute('aria-selected',true);
  } else {
    this.removeClass('vjs-selected');
    this.el_.setAttribute('aria-selected',false);
  }
};

/**
 * @constructor
 */
vjs.MenuButton = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    this.menu = this.createMenu();

    // Add list to element
    this.addChild(this.menu);

    // Don't show empty menu buttons
    if (this.items && this.items.length === 0) {
      this.hide();
    }
    this.on('keyup', this.onKeyPress);
    this.el_.setAttribute('aria-haspopup',true);
    this.el_.setAttribute('role','button');
  }
});

vjs.MenuButton.prototype.buttonPressed = false;

vjs.MenuButton.prototype.createMenu = function(){
  var menu = new vjs.Menu(this.player_);

  // Add a title list item to the top
  if (this.options().title) {
    menu.el().appendChild(vjs.createEl('li', {
      className: 'vjs-menu-title',
      innerHTML: vjs.capitalize(this.kind_),
      tabindex: -1
    }));
  }

  this.items = this.createItems();

  // Add menu items to the menu
  for (var i = 0; i < this.items.length; i++) {
    menu.addItem(this.items[i]);
  }

  return menu;
};

// Create the list of menu items. Specific to each subclass.
vjs.MenuButton.prototype.createItems = function(){};


vjs.MenuButton.prototype.buildCSSClass = function(){
  return this.className + ' vjs-menu-button ' + vjs.Button.prototype.buildCSSClass.call(this);
};

// Focus - Add keyboard functionality to element
// This function is not needed anymore. Instead, the keyboard functionality is handled by
// treating the button as triggering a submenu. When the button is pressed, the submenu
// appears. Pressing the button again makes the submenu disappear.
vjs.MenuButton.prototype.onFocus = function(){};
// Can't turn off list display that we turned on with focus, because list would go away.
vjs.MenuButton.prototype.onBlur = function(){};

vjs.MenuButton.prototype.onClick = function(){
  // When you click the button it adds focus, which will show the menu indefinitely.
  // So we'll remove focus when the mouse leaves the button.
  // Focus is needed for tab navigation.
  this.one('mouseout', vjs.bind(this, function(){
    this.menu.unlockShowing();
    this.el_.blur();
  }));
  if (this.buttonPressed){
    this.unpressButton();
  } else {
    this.pressButton();
  }
};

vjs.MenuButton.prototype.onKeyPress = function(event){
  // Check for space bar (32) or enter (13) keys
  if (event.which == 32 || event.which == 13) {
    event.preventDefault();
    if (this.buttonPressed){
      this.unpressButton();
    } else {
      this.pressButton();
    }
  }

  // Check for escape (27) key
  if (event.which == 27){
    event.preventDefault();
    if (this.buttonPressed){
        this.unpressButton();
    }
  }
};

vjs.MenuButton.prototype.pressButton = function(){
  this.buttonPressed = true;
  this.menu.lockShowing();
  this.el_.setAttribute('aria-pressed',true);
  if (this.items && this.items.length > 0) {
    this.items[0].el().focus(); // set the focus to the title of the submenu
  }
};

vjs.MenuButton.prototype.unpressButton = function(){
  this.buttonPressed = false;
  this.menu.unlockShowing();
  this.el_.setAttribute('aria-pressed',false);
};
