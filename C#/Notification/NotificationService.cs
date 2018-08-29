public class NotificationService : BaseService, INotificationService
{
    public NotificationDomain ReadById(int id)
    {
        NotificationDomain list = new NotificationDomain();
        DataProvider.ExecuteCmd("dbo.Notifications_SelectByUserBaseId",
          inputParamMapper: (SqlParameterCollection inputs) =>
          {
              inputs.AddWithValue("@Id", id);
          },
          singleRecordMapper: (IDataReader reader, short resultSet) =>
          {
              list = DataMapper<NotificationDomain>.Instance.MapToObject(reader);
          });
        return list;
    }
}