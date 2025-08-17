function isValidhex(id){
      return typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
}