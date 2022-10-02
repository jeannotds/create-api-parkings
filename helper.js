
  exports.success = (message, data) => {
    return {
        message, data
    }
}


 exports.getUniqueId = (parkings) => {
    const parkingsId = parkings.map(parking => parking.id)
    const maxId = parkingsId.reduce((a,b) => Math.max(a, b))
    const uniqueId = maxId + 1
      
    return uniqueId
  }