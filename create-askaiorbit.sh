#!/bin/bash

PROJECT="AskAIOrbit"

echo "Creating $PROJECT structure..."

mkdir -p "$PROJECT"
cd "$PROJECT" || exit

############################################
# CORE
############################################
mkdir -p Core/{Bootstrap,Configuration,Environment,CLI,PluginManager,ServiceContainer}

############################################
# FOUNDATION
############################################
mkdir -p Foundation/Helpers
mkdir -p Foundation/{Constants,Enums,Exceptions,Types}

touch Foundation/Helpers/array.helper.js
touch Foundation/Helpers/object.helper.js
touch Foundation/Helpers/string.helper.js
touch Foundation/Helpers/number.helper.js
touch Foundation/Helpers/date.helper.js
touch Foundation/Helpers/time.helper.js
touch Foundation/Helpers/random.helper.js
touch Foundation/Helpers/file.helper.js
touch Foundation/Helpers/csv.helper.js
touch Foundation/Helpers/html.helper.js
touch Foundation/Helpers/json.helper.js
touch Foundation/Helpers/ip.helper.js
touch Foundation/Helpers/validation.helper.js
touch Foundation/Helpers/request.helper.js
touch Foundation/Helpers/response.helper.js
touch Foundation/Helpers/pagination.helper.js
touch Foundation/Helpers/collection.helper.js
touch Foundation/Helpers/map.helper.js
touch Foundation/Helpers/conversion.helper.js
touch Foundation/Helpers/search.helper.js
touch Foundation/Helpers/utility.helper.js

############################################
# DATABASE
############################################
mkdir -p Database/{ORM,Models,Repository,Schema,Migration,Seeder,Drivers}
mkdir -p Database/QueryBuilder
mkdir -p Database/Persistence
mkdir -p Database/Execution
mkdir -p Database/Connection

touch Database/QueryBuilder/query.builder.js
touch Database/QueryBuilder/where.builder.js
touch Database/QueryBuilder/join.builder.js
touch Database/QueryBuilder/sql.generator.js
touch Database/QueryBuilder/metadata.parser.js

touch Database/Persistence/persist.js
touch Database/Persistence/bulkInsert.js
touch Database/Persistence/bulkUpdate.js
touch Database/Persistence/bulkDelete.js

touch Database/Execution/executeQuery.js
touch Database/Execution/executeWithRetry.js
touch Database/Execution/postgres.executor.js
touch Database/Execution/mysql.executor.js
touch Database/Execution/transaction.manager.js

touch Database/Connection/pool.manager.js
touch Database/Connection/connection.manager.js
touch Database/Connection/retry.framework.js

############################################
# SECURITY
############################################
mkdir -p Security/{Authentication,Authorization,Encryption,JWT,Audit,RateLimiter,Sanitizer,SQLProtection,XSSProtection,Validation}

############################################
# COMMUNICATION
############################################
mkdir -p Communication/{SMS,Notification,Queue,WhatsApp,WebSocket}
mkdir -p Communication/Email

touch Communication/Email/template.engine.js
touch Communication/Email/html.processor.js
touch Communication/Email/mail.sender.js
touch Communication/Email/template.builder.js

############################################
# HTTP
############################################
mkdir -p HTTP/{Request,Response,Middleware,Pagination,API,StatusCodes}

############################################
# DATA PROCESSING
############################################
mkdir -p DataProcessing/{Excel,PDF,Reports,Import,Export}
mkdir -p DataProcessing/CSV

touch DataProcessing/CSV/csv.reader.js
touch DataProcessing/CSV/csv.writer.js
touch DataProcessing/CSV/csv.importer.js
touch DataProcessing/CSV/csv.exporter.js

############################################
# AI
############################################
mkdir -p AI/{DocumentationAI,QueryAI,CodeGenAI,ReviewAI,RefactorAI,TestAI,MigrationAI,ChatAI}

############################################
# ENTERPRISE
############################################
mkdir -p Enterprise/{ERP,CRM,HRMS,Inventory,P​​OS,Accounting,Payroll}

############################################
# DEVELOPER
############################################
mkdir -p Developer/{Logger,Scheduler,Storage,Cache,Monitoring,Testing,Benchmark,Debugger}

############################################
# CLOUD
############################################
mkdir -p Cloud/{Docker,Kubernetes,AWS,Azure,GCP,CICD}

echo ""
echo "✔ AskAIOrbit structure created successfully"
echo ""

tree .
