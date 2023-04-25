

$response = Http::withHeaders([
'authorization' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiYXR0Y2FydCIsImNvbGxlY3Rpb25OYW1lIjoiYXVkaXRsb2ciLCJpYXQiOjE2ODI0MTA1MDQsImV4cCI6MTcxMzk0NjUwNH0.I3PMtGpM6QFkaLiiBCq_KPDWnwPgJggtm2h1cTu9PVA',
'Content-Type' => 'application/json',
'Accept' => 'application/json',
])
->post('https://auditlog.aatcart.com/auditlog', [
'requestBody' => (object) $request->headers->all(),
'requestHeader' => (object) $request->headers->all(),
'endPoint' => [
'method' => 'indexRoles',
'path' => 'admins/roles',
],
'finished' => true,
'ip' => $request->ip(),
'action' => AuditLog::ACTION_TYPE_READ,
'statusCode' => 200,
'userId' => Auth::guard('admin')->user()->id,
'userType' => 'admin',
'modelType' => 'role',
'modelId' => 1,
'changed' => [
'before' => (object) [
],
'after' => (object) [
]
],
'metaData' =>  (object) []
]);