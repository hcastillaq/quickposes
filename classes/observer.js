let _instanceObserver = null;

class Observable{

  constructor()
  {
    if( _instanceObserver == null )
    {
      _instanceObserver = this;
      this.observers = {};
    }
    return _instanceObserver;
  }

  subscribe( key, func )
  {
    if( this.observers[key] == undefined )
    {
      this.observers[key] = [];
    }

    func.unsubscribe = () => {
      this.unsubscribe(key, func)
    }
    this.observers[key].push(func);

    return func;
  }

  notify( key, data = null )
  {
    this.observers[key].forEach( func =>  func( data ) );
  }

  unsubscribe(key, func)
  {
    this.observers[key] = this.observers[key].filter(observer => {
      if( observer !== func )
      {
        return observer;
      }
    });
  }
}

module.exports = new Observable();